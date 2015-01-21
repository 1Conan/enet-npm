var enet = require("../lib/enet");

enet.createServer({
		address: new enet.Address("0.0.0.0", 6666),
		peers: 32,
		channels: 1,
		down: 0,
		up: 0
	},
	function (err, host) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("host ready on %s:%s", host.address().address(), host.address().port());

		host.on("connect", function (peer, data) {
			console.log("peer connected");
			peer.createWriteStream(peer, 0).write("hello I'm the server!");
			peer.createReadStream(0).pipe(process.stdout);
			setTimeout(function () {
				peer.disconnect();
			}, 2000);
		});

		host.start();
	}
);
