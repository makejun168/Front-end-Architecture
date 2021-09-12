class PlayStation {
	constructor() {
		this.state = "off";
	}

	play() {
		if (this.state === "on") {
			console.log("Already opening");
			return;
		}
		this.state = "on";
		console.log("open");
	}

	shutdown() {
		if (this.state === "off") {
			console.log("Already off");
			return;
		}
		this.state = "off";
		console.log("off");
	}
}

PlayStation.instance = undefined;
PlayStation.getInstance = function() {
    return function() {
        if (!PlayStation.instance) {
            PlayStation.instance = new PlayStation();
        }

        return PlayStation.instance;
    }();
};


const ps1 = PlayStation.getInstance();

ps1.play();

const ps2 = PlayStation.getInstance();

ps2.play();
