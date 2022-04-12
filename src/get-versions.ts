const packages = [
	'@remotion/bundler',
	'@remotion/cli',
	'@remotion/eslint-config',
	'@remotion/renderer',
	'@remotion/media-utils',
	'@remotion/babel-loader',
	'@remotion/lambda',
	'@remotion/three',
	'@remotion/gif',
	'remotion',
];

const getVersion = (p: string): string | null => {
	try {
		const remotionPkgJson = require(`${p}/package.json`);
		return remotionPkgJson.version;
	} catch (err) {
		return null;
	}
};

const groupBy = (vals: [string, string][]) => {
	const groups: {[key: string]: string[]} = {};
	for (const [pkg, version] of vals) {
		if (!groups[version]) {
			groups[version] = [];
		}

		groups[version].push(pkg);
	}

	return groups;
};

const versions: [string, string][] = packages
	.map((p) => [p, getVersion(p)] as [string, string])
	.filter(([, version]) => version);
console.log(groupBy(versions));
