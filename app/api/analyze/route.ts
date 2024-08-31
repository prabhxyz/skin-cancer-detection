import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // get search query
  const params = request.nextUrl.searchParams;

  const img = params.get("img");
  if (!img) {
    return NextResponse.json(
      {
        error: "img is required",
      },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();
  // fetch image from supabase
  const { data, error } = await supabase.storage.from("images").list("", {
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  // match id with file name
  const file = data?.find((file) => file.name.split(".")[0] === img);

  if (!file) {
    return NextResponse.json(
      {
        error: "Image not found",
      },
      {
        status: 404,
      },
    );
  }
  // create signed url
  const { data: signedURL, error: signedURLError } = await supabase.storage
    .from("images")
    .createSignedUrl(file.name, 60);

  if (signedURLError) {
    console.error(signedURLError);
  }

  const url = signedURL?.signedUrl;
  console.log(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({
    type: "Melanoma",
    probability: 0.8,
  });
}
