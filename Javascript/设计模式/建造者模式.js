
class Skin {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log('skin init');
    }
}

class Product {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log('skin init');
    }
}


// 建造者模式
class Shop {
    constructor(name) {
        this.package = ;
    }

    create(name) {
        this.package = new PackageBuilder(name);
    }

    getGamePackage() {
        return this.package.getPackage();
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