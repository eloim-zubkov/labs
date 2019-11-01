const {Router} = require('express');

const router = new Router({
	caseSensitive: true,
	mergeParams: true
});

router.get('/', (req, res) => {
	res.render('view');
});

module.exports = router;
