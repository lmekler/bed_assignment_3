# Security Configuration Explanation

## Helmet.js Configuration

### Configuration Applied

```
helmet({
    contentSecurityPolicy: false, 
    hidePoweredBy: true, 
    noSniff: true, 
    hsts: 
    { 
        maxAge: 31536000, 
        includeSubDomains: true, 
        preload: true
    }, 
    frameguard: { action: "deny" }, 
    referrerPolicy: { policy: "no-referrer" }
}); 
```

### Justification

1. **contentSecurityPolicy: false**  
Disabled because this API only returns JSON data. CSP defends against XSS attacks on webpages that use HTML, which is not used in this app.

2. **hidePoweredBy: true**  
Enabled to hide the X-Powered-By header, which exposes an app's server technology, making the application more vulnerable to targeted attacks.

3. **noSniff: true**  
Disabled MIME type sniffing to prevent browsers from interpreting files as an unexpected MIME type, this prevents XSS attacks.

4. **hsts: false (in development)**  
Disabled in development to allow for local testing.

5. **hsts: true (in production)**  
Enabled in production to automatically convert HTTP requests to HTTPS requests, which encrypts data in transfer.

    ```maxAge: 31536000``` - Convert HTTP requests to HTTPS requests for 1 year  
    ```includeSubDomains: true``` - Apply hsts policy to all subdomains  
    ```preload: true``` - Enforce HTTPS on first visit

6. **frameguard: { action: "deny" }**  
Set to DENY to restrict who can frame a website, which prevents clickjacking attacks.

7. **referrerPolicy: { policy: "no-referrer" }**  
Set to no-referrer to prevent the browser from including the Referer header, which hides the URL of the page that made the request.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Cheat Sheet Series - https://cheatsheetseries.owasp.org/index.html
3. MDN Web Docs - https://developer.mozilla.org/en-US/
4. NPM - https://www.npmjs.com/

## CORS Configuration

### Configuration Applied

```
origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"],
allowedHeaders: ["Content-Type", "Authorization"]
```

### Justification

1. **origin: true (in development)**   
Enabled in development to allow requests from any origin, for ease of testing.

2. **origin: process.env.ALLOWED_ORIGINS?.split(",") || [], (in production)**  
Restricted in production to limit access to only specific, trusted origins.

3. **credentials: true**  
Enabled to allow cookies, HTTP authentication, or other credentials to be sent with requests.

4. **methods: ["GET", "POST", "PUT", "DELETE"]**  
Set to GET, POST, PUT, and DELETE methods, to specify that these are the allowed request methods.

5. **allowedHeaders: ["Content-Type", "Authorization"]**  
Set to Content-Type and Authorization headers, to specify that these are the allowed headers for requests, preventing users from sending unexpected or unsafe headers.

### Sources

1. MDN Web Docs - https://developer.mozilla.org/en-US/
