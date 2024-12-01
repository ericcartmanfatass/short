/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

// functions/utils.js

// 短网址名称
export const shortName = `短网址`;

// 正常 Api 跨域请求允许域
export const allowOrigin = "*"

// 代理 Api 跨域请求允许域
export const allowProxyOrigin = "*"

// 随机 slug 位数 (包括固定前缀)
export const initialLength = 6;

// 特定域名列表，可根据需要来取消注释或是添加、删改
export const specialDomains = [
    "eu.org",
    "us.kg",
//    "pp.ua",
//    "rr.nu",
    "pages.dev",
//    "workers.dev",
    "github.io"
];

// 联系人邮箱
export const adminEmail = `ikun@saintmaria.me`;

// 跳转页 Head 块
export const htmlHead = `<!-- Head -->
<meta charset="UTF-8" />
<link rel="icon" href="/favicon.ico" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" rel="preload" href="/css/jump-styles.css" as="style" />`;

// 跳转页 No Script 提示
export const noscript = `<!-- Noscript -->
<noscript>
    <p>注意：完整使用 ${shortName}需要浏览器支持（启用）JavaScript！</p>
    <p>此页面（短链跳转）也可以在不运行 JavaScript 的情况下使用，请手动操作页面。</p>
</noscript>`;

// 跳转页 Footer 块
export const footer = `<!-- Footer -->
<hr />`;

// 生成随机字符串 slug
export function generatePrefixedRandomSlug(length) {
    const characters = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    // 将随机的首字符固定为 - 来区分随机和自定义
    result += "-";

    for (let i = 1; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// 统一返回函数
export function createResponse(code, message, extraData = {}) {
    return Response.json({
        code: code,
        message: message,
        time: Date.now(),
        releases: 'v1.4.4-final',
        ...extraData
    }, {
        headers: corsHeaders,
        status: code
    });
}

// CORS 相关的响应头部信息
export const corsHeaders = {
    'Access-Control-Allow-Origin': `${allowOrigin}`,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
};

// 哈希密码函数
export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};
