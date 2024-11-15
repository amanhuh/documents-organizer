import { signIn } from "@/auth";
import { NextResponse } from "next/server";
import { handlers } from "@/auth"

export async function POST(req) {
  const { rollNo, password } = await req.json();

  try {
    const result = await signIn("credentials", {
      redirect: false,
      rollNo,
      password,
      callbackUrl: "/"
    });
   
    if (result.error) {
      //console.log(result.error);
      return NextResponse.json({ message: 'Invalid credentials', error: error }, { status: 401 });
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error.type == 'AccessDenied') {
      return NextResponse.json({ message: 'Access Denied', error: error, errMsg: error.cause.err.message }, { status: 403 });
    }
    return NextResponse.json({ message: 'Internal Server Error', error: error, errMsg: error.cause.err.message }, { status: 500 });
  }
};

export const { GET } = handlers;