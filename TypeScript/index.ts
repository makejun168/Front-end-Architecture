// class Animal {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//
//     run() {
//         return `${this.name} is running`
//     }
// }
//
// const snake = new Animal('kobe');
//
// console.log(snake.run())
//
// interface Radio {
//     name: string;
//     switchRadio(): void;
// }

type Direction = {
    Up: 'UP';
    Down: 'Down';
    Left: 'Left';
    Right: 'Right';
}


// // 枚举 enums
// enum Direction {
//     Up = 'UP',
//     Down = 'Down',
//     Left = 'Left',
//     Right = 'Right',
// }


// const value = 'UP'
//
// if (value === Direction.Up) {
//     // do something
// }



const permissions = ['read', 'write', 'execute'] as const
type Permission = typeof permissions[number]
