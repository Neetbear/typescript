// const hello = () => "hi";

// class Block {
//     constructor(private data: string) {}
//     static hello() {
//         return "Hi";
//     }
// }

// 이 방식은 myPackage.d.ts 필요
// import {init, exit} from "myPackage";
// init({
//     url:"true"
// })
// exit(1)

import {init, exit} from "./myPackage";
init({
    debug: false,
    url: "hello"
})
exit(5)