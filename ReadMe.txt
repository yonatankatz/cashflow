How to RTL
============================
To make RTL, need to comment 3 lines and uncomment another 3 lines.

Comment Below Lines:
1. <html lang="en" >
2. <link href="css/vendors.bundle.css" rel="stylesheet" type="text/css" />
3. <link href="css/style.bundle.css" rel="stylesheet" type="text/css" />

Uncomment Below Lines:
1. <html lang="en" direction="rtl" style="direction: rtl;" >
2. <link href="css/vendors.bundle.rtl.css" rel="stylesheet" type="text/css" />
3. <link href="css/style.bundle.rtl.css" rel="stylesheet" type="text/css" />



Search Document Feature Setup
============================
Search Document Feature will not work locally. For that, you need to specify proper url. You can change that url inside scripts.bundle.js : Line-3230
I placed search.html file which should be the output format of search document request.



Fill free if you have any issue or doubt.