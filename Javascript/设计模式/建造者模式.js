class Skin {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log(this.name + 'skin init');
        return this.name + 'skin init';
    }
}

class Product {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log(this.name + 'Product init');
        return this.name + 'Product init'
    }
}


class PackageBuilder {
    constructor(name) {
        this.game = new Product(name);
        this.skin = new Skin(name);
    }

    getPackage() {
        return this.game.init() + this.skin.init();

    }
}

// 建造者模式
class Shop {
    constructor(name) {
        this.package = '';
    }

    create(name) {
        this.package = new PackageBuilder(name);
    }

    getGamePackage() {
        return this.package.getPackage();
    }
}

const s1 = new Shop('kobe');
s1.create('kobe');
s1.getGamePackage();