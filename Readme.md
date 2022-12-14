# typescript 
strongly typed programming language

## why typescript?
javascirpt에는 타입의 모호함에서 오는 안정성의 문제가 있다
1) 타입 자동 변환
```javascript
[1,2,3,4] + false // '1,2,3,4false'
```
2) 매개변수 문제
```javascript
function divide(a,b) {
    return a/b;
}
divide("xxxx") // NaN 매개변수(argument)의 입력수와 타입이 에러나도 실행
```
3) runtime error
```javascript
const NeetBear = {name:"NeetBear"};
NeetBear.hello(); 
// 객체안에 hello function 없어서 runtime error 발생 
// -> typescript 에서는 compile error로 코드 실행전에 문법오류 캐치 가능
```

## typescript 
javascript로 컴파일해서 실행 -> 브라우저가 javascript를 이해하므로 / 단 node.js는 typescript 읽는다
typescript로 작성한 코드에 오류가 있으면 javascript로 컴파일 불가능 -> 이 방식으로 javascript에서 못잡는 type 에러 해결

### type system
컴파일러(컴파일러의 type checker)에게 변수의 타입을 알려줘야한다. 단, 타입스크립트는 변수 선언만 해도 타입을 추론해서 처리 해준다.
```typescript
let a = "hello"; // 타입스크립트는 a가 string형이라고 추론해서 처리해준다.
a = "bye";
a = 1; // 타입 에러 
```
타입을 명시해주는 경우
```typescript
let b : boolean = false;
```
#### 타입스크립트에서는 배열도 타입에 맞게 사용해줘야 한다
```typescript
let c = [1,2,3,4];
c.push("5"); // c는 number array라 타입에러 발생
c.push(5);
```
```typescript
let d : number[] = [];
d.push(1);
```

#### 객체에 없는 요소나 type 오류시에도 에러 발생
```typescript
const player = {
    name: "neetbear"
}
player.name = 1; // type 에러
player.hello(); // 없는 요소라 에러
```

#### optional type (선택적 변수)
```typescript
const player : { // 객체형이라고 명시하는 방법
    name: string,
    age?: number // optional type -> 객체에 age는 있을수도 있고 없을수도 있다
} = {
    name: "neetbear"
}
if(player.age && player.age < 10) { // age는 optional이라 존재 유무부터 판별해줘야 한다
    console.log(player.age);
}
```

#### type alias 
같은 object형 같은 경우 매번 똑같은 코드 쓰는 것 방지 위해서 존재
```typescript
// type Age = Number;
type Player = {
    name: string,
    age?: number // Age // age가 다른 곳에서도 사용된다면 이런 방식까지도 가능하다
}
const neet : Player = {
    name: "neet"
}
const bear : Player = {
    name: "bear",
    age: 12
}
```

#### function의 경우
매개변수에 타입 명시해줘야 한다
```typescript
type Name = String;
type Age = Number;
type Player = {
    name: Name,
    age?: Age 
}
function playerMaker(name:string) : Player { // return이 Player형이라고 명시
    return {
        name // 변수명 같으므로 name: name 대신에 이렇게 가능
    }
}
const neet = playerMaker("neet");
neet.age = 12;
// arrow function의 경우
const playerMaker2 = (name:string) : Player => ({name})
const bear = playerMaker2("bear");
bear.age = 9;
```

#### readonly 속성
javascript에는 없는 불변성을 주는 속성
```typescript
type Name = String;
type Age = Number;
type Player = {
    readonly name: Name,
    age?: Age 
}
const playerMaker2 = (name:string) : Player => ({name})
const bear = playerMaker2("bear");
bear.age = 9;
bear.name = "neet" // name은 readonly라 불가능 
```
```typescript
const numbers : readonly number[] = [1,2,3,4];
numbers.push(5); // readonly라 불가능 -> 불변성
// const array는 재할당이 불가능이지 불변은 아니라서 배열 내부 요소 변경 가능하다
```

#### tuple
서로 다른 타입의 요소를 가지는 배열 생성, 단 최소한의 length를 가져야한다
```typescript
const player : [string, number, boolean] = ["neet", 1, true];
```

#### 기타 타입들 - any
```typescript
let a : undefined = undefined;
let b : null = null;
let c = []; // any type
let d : any = false;
// any type은 타입스크립트의 타입 보호장치를 사용하지 않아야하는 애들에 주는 타입
```

#### unknown
변수의 타입을 모를 경우
```typescript
let a : unknown; // 타입스크립트에서 어떤 작업을 수행할때 unknown의 타입을 먼저 확인한다
if(typeof a === "number") {
    let b = a + 1;
} else if(typeof a === "string") {
    let b = a.toUppercase();
}
```

#### void
아무것도 return하지않는 function의 경우
```typescript
function hello() { // 이런 함수의 경우 타입이 void
    console.log("Hello");
} // void는 보통 명시적으로 작성해줄 필요는 없다 
```

#### never 
함수가 절대 return하지 않는 경우 
```typescript
// case 1
function hello() : never {
    throw new Error("error"); // return하지 않고 오류를 발생시키는 함수라 문제 없음
}
// case 2
function hi(name:string|number) {
    if(typeof name === "string") {
        name // string type
    } else if(typeof name === "number") {
        name // number type
    } else {
        name // 이때 name은 never type
        // 이 코드는 함수가 정상적으로 실행될때 작동하면 안되는 부분이다
    }
}
```

## typescript에서의 function
### call signatures
```typescript
const add = (a: number, b: number) => a + b; 
// 이때 add에 대한 call signatures는 (a: number, b: number) => number
// 함수의 매개변수 타입과 반환 타입을 알려준다

type Add = (a: number, b: number) => number;
/*
type Add = {
    (a: number, b: number) : number
} 이렇게도 작성 가능하다(overloading)
*/
const add2: Add = (a, b) => a + b;
``` 

### overloading
함수가 서로 다른 여러 signature를 가질 경우 발생 
```typescript
type Add = {
    (a: number, b: number) : number
    (a: number, b: string) : number
} // 이 경우 b: number|string 
const add: Add = (a, b) => {
    if(typeof b === "string") return a;
    return a + b;
}
``` 

- react.js(Next.js)에서 볼 만한 예시
```
Router.push("/home")
Router.push({
    path: "/home",
    state: 1
})
```
```typescript
// push는 이런 식으로 구성되어 있을 것이다
type Config = {
    path: string,
    state: object
}
type Push = {
    (path: string): void,
    (config: Config): void
}
const push: Push = (config) => {
    if(typeof config === "string") {
        // config로 페이지 이동
    } else {
        // config.path로 페이지 이동
    }
}
```
오버로딩 응용
```typescript
type Add = {
    (a: number, b: number) : number
    (a: number, b: number, c:number) : number
} 
const add: Add = (a, b, c?:number) => { // c는 option
    if(c) return a + b + c;
    return a + b;
}
``` 

### polymorphism
poly : multi, many, several, much
morpho : form, structure
즉, 여러 다른 구조들이란 뜻이 된다 
```typescript
type SuperPrint = {
    (arr: number[]): void
    (arr: boolean[]): void
    (arr: string[]): void
} // -> 모든 경우의 signature를 줘야 하므로 비효율적이다
const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

// concrete type : number, boolean, string, void, unknown 등등
// generic type : type의 placeholder 느낌
// 모든 signature 만들순 없으니 generic 활용할 것

type SuperPrint2 = {
    // <generic type 이름>
    <TypePlaceholder>(arr: TypePlaceholer[]): void // TypePlaceholder -> return 존재할 경우 
    // 이름이라 짧게 T나 V로 쓰기도 한다
    // <T>(arr: T[]): T
}
const superPrint2: SuperPrint2 = (arr) => {
    arr.forEach(i => console.log(i))
}
// generic type 사용시 매개변수의 타입을 보고 타입을 유추해서 signature 생성
``` 

### generics recap
```typescript
type SuperPrint = {
    <T, M>(a: T[], b: M): T
}
const superPrint: SuperPrint = (a) => a[0]
// any 안쓰고 generic을 사용하는 이유는 any는 type system을 무시하므로 런타임 에러 가능 
``` 

### 활용
```typescript
function superPrint<V>(a: v[]) {
    return a[0]
}
const a = suprePrint<number>([1,2,3,4]); // <number>라고 overwrite 도 가능

type Player<E> = {
    name: string
    extraInfo: E
}
type NeetExtra = {
    {favFood: string}
}
type NeetPlayer = Player<NeetExtra>
const neet: NeetPlayer = {
    name: "neet",
    extraInfo: {
        favFood: "kimchi"
    }
}

const bear: Player<null> = {
    name: "bear",
    extraInfo: null
}

type A = Array<number>
let a: A = [1,2,3,4];

function printAllNumbers(arr: Array<number>) { // arr: number[] 같은 기능    
}
```

## class
### constructor
private, public 기능은 javascript로 compile 시 없어진다
```typescript
class Player {
    constructor(
        private firstname: string,  // this.firstname
        private lastname: string,   // this.lastname
        public nickname: string     // this.nickname
    ) {}
}

const neet = new Player("Neet", "Bear", "gugom");
console.log(neet.firstname); // private이라 컴파일 에러
```

### abstract class (추상 클래스)
직접 인스턴스 생성을 못하고 다른 클래스가 상속받아 사용할 수 있는 클래스
javascript에는 없는 개념이라 컴파일시 일반 클래스로 표현된다
단, 상속을 받아도 private에는 접근 불가능하다 
```typescript
abstract class User{
    constructor(
        private firstname: string,  // this.firstname
        private lastname: string,   // this.lastname
        public nickname: string     // this.nickname
    ) {}
}

class Player extends User{
    
}

const neet = new Player("Neet", "Bear", "gugom");
```

### methods & abstract methods
methods도 public private 가능
```typescript
abstract class User{
    constructor(
        // 자식 클래스에서 접근 허용하려면 private 대신 protected 사용
        protected firstname: string,  
        protected lastname: string,   
        protected nickname: string     
    ) {}
    abstract getNickName(): void 
    private getFullName() {
        return `${this.firstname} ${this.lastname}`
    }
}

class Player extends User{
    getNickName() {
        console.log(this.nickname);
    }
}

const neet = new Player("Neet", "Bear", "gugom");
neet.getNickName() // private methods라 오류
```

### 활용
```typescript
type Words = {
    [key: string]: string // key-value 쌍의 object
}
class Dict {
    private words: Words // constructor에서 초기화 안해주면 에러 발생
    constructor(
        this.words = {}
    ) {}
    add(word: Word) { // class도 type처럼 사용 가능하다
        if(this.words[word.term] === undefined) {
            this.words[word.term] = word.def
        }
    }
    def(term: string) {
        return this.words[term]
    }
    static hello() { // 인스턴스 생성없이도 호출 가능한 class의 함수
        return "hello";
    }
}
class Word {
    constructor(
        // public이어도 readonly 속성으로 값 변경 불가능
        public readonly term: string,
        public readonly def: string
    ) {}
}

const kimchi = new Word("kimchi", "Korean food");
const dict = new Dict();
dict.add(kimchi);
dict.def("kimchi");

Dict.hello();
```

### interfaces
interface는 컴파일시 사라진다
```typescript
// type alias 방식 1
type Nickname = string;
type HealthBar = number;
type Freinds = Array<string>;

type Player = {
    nickname: Nickname,
    healthBar: HealthBar
}
const neet = {
    nickname: "neetBear",
    healthBar: 10
}

// 방식 2
type Team = "red" | "blue" | "yellow"
type Health  = 1 | 5 | 10

type Player2 = {
    nickname: string,
    team: Team,
    health: Health
}

const bear = {
    nickname: "neetbear",
    team: "red",
    health: 10
}

// 방식 3 - interface
// type과 interface 차이
// 인터페이스는 오직 object의 모양을 특정해주는 용도
interface Player3 { 
    nickname: string,
    team: Team,
    health: Health
}

const neetbear = {
    nickname: "neetbear",
    team: "red",
    health: 10
}
```
```typescript
interface User {
    name: string
}
interface Player extends User {
// type Player = User &  -> 타입으로 작성한 경우
}

const neet: Player = {
    name: "neetBear"
}
```
```typescript
interface User {
    name: string
}
interface User {
    lastName: string
}
interface User {
    health: number
}
// 3번 각각 나눠서 작성하여도 typescript가 알아서 하나로 합쳐준다 -> type과의 차이점
const neet: User = {
    name: "neet",
    lastName: "bear",
    health: 10
}
```

### interfaces2
```typescript
abstract class User {
    constructor (
        protected firstName: string,
        protected lastName: string
    ) {}
    abstract sayHi(name: string): string
    abstract fullName(): string
}
class Player extends User {
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName}`
    }
}
// 추상 클래스의 문제점은 javascript에 없는 개념이다 
```
```typescript
interface User {
    firstName: string,
    lastName: string
    sayHi(name: string): string
    fullName(): string
}
interface Human {
    health: number
}
class Player implements User, Human {
    constructor( // interface에서 public이니까 private 불가능
        public firstName: string,
        public lastName: string,
        public health: number
    ) {}
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName}`
    }
}
// interface를 type으로 사용하는 것은 가능하다
function makeUser(user: User) {
    return "hi"
}
makeUser({
    firstName: "neet",
    lastName: "bear",
    fullName: () => "xxx",
    sayHi(name) => "string"
})
// interface를 return 받는 경우에는
function makeUser2(user: User): User {
    return {
        firstName: "neet",
        lastName: "bear",
        fullName: () => "xxx",
        sayHi(name) => "string"
    }
    // return user
}
```

### recap
```typescript
type PlayerA = {
    name: string
}
type PlayerAA = PlayerA & {
    lastName: string
}
const playerAA: PlayerAA = {
    name: "neet",
    lastName: "bear"
}

interface PlayerB {
    name: string
}
interface PlayerBB extends PlayerB {
    lastName: string
}
interface PlayerBB {
    health: number
}
const playerBB: PlayerBB = {
    name: "neet",
    lastName: "bear",
    health: 10
}
```
```typescript
type PlayerA = {
    firstName: string
}
interface PlayerB {
    firstName: string
}
class User implements PlayerB /* | playerA */ {
    constructor (
        public firstName: string
    ) {}
}
```

### Polymorphism
generic -> concrete type X placeholder type O
```typescript
interface SStorage<T> {
    [key: string]: T 
}
class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key: string, value: T){
        this.storage[key] = value;
    }
    remove(key: string) {
        delete this.storage[key];
    }
    get(key: string): T {
        return this.storage[key];
    }
    clear() {
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()
stringStorage.set("Hello", "How are you?")
stringStorage.get("Hello")

const booleanStorage = new LocalStorage<boolean>()
booleanStorage.set("Man", true)
```