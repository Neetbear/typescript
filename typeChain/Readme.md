npm init -y
package.json에서 "test": "echo \"Error: no test specified\" && exit 1" 제거
npm install -D typescript

mkdir src
index.ts 생성

touch tsconfig.json
includes == ts 파일들 경로 (컴파일러에 알려주는 용도)
compilerOptions == 컴파일러에 주는 옵션
    - outDir == 컴파일된 js파일이 생성될 dir
        -> package.json에 "build": "tsc" 추가 
        -> npm run build(컴파일 명렁어)
    
    - target == 컴파일될 js파일 버전 설정
        -> 기본 옵션은 es3 (호환성 문제 방지를 위해서)
        -> es6 버전이 가장 이상적 (최신 브라우저가 es6의 문법을 지원하므로)
    
    - lib == 합쳐진 라이브러리의 정의 파일을 특정해주는 역할 (런타임 환경 알려주기)
        -> 런타임 환경의 js 버전 + 어디서 작동하나 (dom == 브라우저 환경)
        -> 이기능의 역할 : dom 쓰면 ts가 document등을 알고 있음
        % declaration files(정의 파일) : ts가 이해할수 있게 작성된 라이브러리 정의 파일 
    
    - esModuleInterop == Commonjs방식으로 내보낸 모듈을 es모듈 방식의 import로 가져올 수 있게 해준다.(import오류 해결)

    - strict == 엄격한 타입 체킹 옵션 활성화 
        -> 활성화시 import해서 쓰는 모듈에 대해서도 정의 파일이 필요 ex)myPackage.d.ts
        -> myPackage.js && myPackage.d.ts 작성

    - allowJs == 타입스크립트 파일에서 자바스크립트를 허용하겠다(.js 파일 import 등등)
        % @ts-check ts파일에서 사용하는 js파일에 작성하면 컴파일러가 js파일도 체킹해줌
        JSDoc 사용해서 타입알려주면 js코드 건드릴 필요 없다

package.json에 "start": "node build/index.js" 추가 (실행 파일)

npm i -D ts-node (빌드없이 타입스크립트 실행 가능 개발환경 용도)
npm i nodemon
package.json에 "dev": "nodemon --exec ts-node src/index.ts" 추가

definitely typed == npm에 존재하는 거의 모든 모듈의 type 정의 파일을 가지고 있다
npm i -D @types/node