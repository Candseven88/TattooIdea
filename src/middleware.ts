import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 空的middleware函数，不执行任何操作
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// 空的matcher配置，不匹配任何路径
export const config = {
  matcher: [],
}; 