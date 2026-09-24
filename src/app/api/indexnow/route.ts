import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urlsToSubmit: string[] = body.urls || [];

    const INDEXNOW_KEY = "854cf68bc1ae44b2baf32093760cc3a9";
    const HOST = "nano-signs.com";
    const BASE_URL = `https://${HOST}`;
    const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

    const defaultUrls = [
      `${BASE_URL}/`,
      `${BASE_URL}/about-us`,
      `${BASE_URL}/contact-us`,
      `${BASE_URL}/return-policy`,
      `${BASE_URL}/get-a-quote`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/projects`,
      `${BASE_URL}/locations`,
      `${BASE_URL}/design`,
      `${BASE_URL}/faq`,
      `${BASE_URL}/corporate-pricing`,
    ];

    const finalUrls = Array.from(
      new Set(urlsToSubmit.length > 0 ? urlsToSubmit : defaultUrls)
    );

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: finalUrls,
    };

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: "Successfully submitted URLs to IndexNow",
        submittedCount: finalUrls.length,
        status: response.status,
      });
    }

    const text = await response.text();
    return NextResponse.json(
      {
        success: false,
        message: "IndexNow API returned non-OK response",
        status: response.status,
        details: text,
      },
      { status: response.status || 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to submit to IndexNow",
      },
      { status: 500 }
    );
  }
}
