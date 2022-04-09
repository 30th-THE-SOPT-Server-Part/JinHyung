console.log('Nihao...')

setTimeout(() => {
    console.log('안녕하세요.')
}, 2000);

console.log('Bye...')

const CONDITION: boolean[] = [true, false];

const promise = new Promise((resolve, reject) => {
    // now pending status
    if (CONDITION[Math.round(Math.random())]) {
        resolve(console.log('real success'));
    } else {
        reject();
    }
});

promise.then((resolved): void => {
    console.log("ㅎㅎㅎ")
}).catch(err => console.log('ㅠㅠㅠ'))

const resturaunt = (callback: () => void, time: number) => {
    setTimeout(callback, time);
}

const order = () => {
    return new Promise((resolve, reject) => {
        resturaunt(() => {
            console.log('The status quo of resturant')
            resolve('now working..')
        }, 1000);
    })
}

const cook = () => {
    return new Promise((resolve, reject) => {
        resturaunt(() => {
            console.log('now cooking...')
            resolve('now cooking..')
        }, 1000);
    })
}

const serve = () => {
    return new Promise((resolve, reject) => {
        resturaunt(() => {
            console.log('now serving...')
            resolve('now serving..')
        }, 1000);
    })
}

const eat = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resturaunt(() => {
            console.log('now eating...')
            resolve(`${progress} -> eating a food`)
        }, 1000);
    })
}

order()
    .then(progress => cook())
    .then(progress => serve())
    .then(progress => eat('kimchi'))
    .then(progress => console.log("done"));

Promise.resolve(123).then(res => {
    console.log(res)
    // throw new Error('error executed!!!');
})

let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc1 - ${msg}`)
        })
    })
}

let asyncFunc2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc2 - ${msg}`)
        })
    })
}

let promiseMain1 = (): void => {
    asyncFunc1("hello?")
    asyncFunc2("Bye!")
}

let promiseMain2 = (): void => {
    asyncFunc1('hi').then((result: string) => {
        console.log("RRR");
        return asyncFunc2("Hello")
    }).then((result: string) => {
        console.log("VVV")
    })
}

const ILoveAsyncAwait = async(): Promise<void> => {
    let result = await asyncFunc1("Hello.");
    console.log(result);

    let result2 = await asyncFunc2("Bye.");
    console.log(result2);
};

ILoveAsyncAwait();