### ffmpegwsm-reactjs-expressjs

Making FfmpegWasm WebAssembly working with cross-origin enabled.

I'm trying to learn WebAssembly with FFmpeg in JS,  I have faced an issue of  
`Your browser doesn't support SharedArrayBuffer Issue` [#102](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/102 "#102")
I followed the mentioned solution and implemented it here, and  so far seems working fine,  I have not finished it yet,
switched to JavaFX but wanted to share my finding.


as mentioned above  [#102](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/102 "#102") 
ffmpegwasm needs to have Cross-Origin-Opener-Policy &amp; Cross-Origin-Embedder-Policy restricted on the server side, 
while many ReactJS may need an access to an external js scripts served by different origin i.e hosted checkout page of Stripe  or Google Analysis JS etc.
Here I have developed 2 micro-frontends  + Expressjs app that renders both micro-frontends.

* first micro-frontend run ffmpeg 
you can import any. mp4 video it will convert it to mp3

* second micro-frontend run normal ReactJS with cross-origin enabled for testing  stripe hosted checkout.
Once you attach your Stripe API key and API secret from Stripe dashboard it should work 

##### Build the 2 micro-frontend apps + copy build folders to one folder: 
from root folder, run `npm run build-ffmpeg`
##### Run the ExpressJS app 
from `backend`  run `npm run start` 

This should build 2 frontend, add them to `build-all` folder which served by 2 expressjs endpoints.


* http://localhost:7777/fffmpeg  
  `res.header('Cross-Origin-Opener-Policy', 'same-origin');`
  
  `res.header('Cross-Origin-Embedder-Policy', 'require-corp'); `
  
* http://localhost:7777/payment
  `res.header("Access-Control-Allow-Origin", "*");`
  
  `res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");`
  

#### Notes & Thanks
* Thanks https://github.com/fireship-io/react-wasm-gif-maker 
nice tutourials here:
https://www.youtube.com/watch?v=-OTc0Ki7Sv0 
 
* Thansk to  @rwieruch, the Stripe ReactJS code was copied from this repo  :

https://github.com/rwieruch/react-express-stripe

* as coming from Java backend, the concept of having 2 micro-frontends 
(x small reactjs apps) is not very common up to my knowledge but solved the issue for me and helped me to make a desision in 2 hours with this Poc.
