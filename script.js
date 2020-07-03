let main = document.createElement('div')
main.classList.add('margin-center')
document.body.appendChild(main)

let container = document.createElement('div')
container.classList.add('container-fluid')
main.appendChild(container)

let papertitle = document.createElement('div')
papertitle.classList.add('h1', 'text-center', 'title')
papertitle.innerHTML = 'Top Stories'.toUpperCase()
papertitle.addEventListener('click', () => {
	generateContent()
})
container.appendChild(papertitle)

let sections = [
	'World',
	'Politics',
	'Business',
	'Technology',
	'Science',
	'Health',
	'Sports',
	'Arts',
	'Books',
	'Food',
	'Travel',
	'Magazine',
]

let sectionrow = document.createElement('div')
sectionrow.classList.add('row', 'border-top', 'border-bottom', 'py-3')
container.appendChild(sectionrow)

for (let sec of sections) {
	let sectioncol = document.createElement('div')
	sectioncol.classList.add(
		'col-lg-1',
		'col-md-3',
		'col-sm-6',
		'text-center',
		'cursor'
	)
	sectioncol.innerHTML = sec.toUpperCase()
	sectioncol.addEventListener('click', () => {
		generateContent(sec.toLowerCase())
	})
	sectionrow.appendChild(sectioncol)
}

let content = document.createElement('div')
content.classList.add('row')
container.appendChild(content)

async function generateContent(section = 'home') {
	content.innerHTML = ''
	let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=Sa9FA7OOineRnv899gA6Zc8wjOpb6J1V`
	let data = (await (await fetch(url)).json()).results
	// console.log()

	for (let k in data) {
		let colcard = document.createElement('div')
		colcard.classList.add('col-12', 'p-0')
		content.appendChild(colcard)

		let card = document.createElement('div')
		card.classList.add('card', 'm-0', 'card-dimension')
		colcard.appendChild(card)

		let cardcontainer = document.createElement('div')
		cardcontainer.classList.add('container')
		card.appendChild(cardcontainer)

		let cardrowmain = document.createElement('div')
		cardrowmain.classList.add('row')
		cardcontainer.appendChild(cardrowmain)

		let cardcolmain1 = document.createElement('div')
		cardcolmain1.classList.add('col-8', 'align-self-center')
		cardrowmain.appendChild(cardcolmain1)

		let sectioncard = document.createElement('div')
		sectioncard.classList.add('text-primary', 'font-weight-bold')
		sectioncard.innerHTML = data[k].section.toUpperCase()
		cardcolmain1.appendChild(sectioncard)

		let titlecard = document.createElement('div')
		titlecard.classList.add('h3', 'font-weight-bold')
		titlecard.innerHTML = data[k].title
		cardcolmain1.appendChild(titlecard)

		let [yy, mm, dd] = data[k].published_date
			.split('T')[0]
			.split('-')
			.map(Number)
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		let pubdate = new Date(yy, mm - 1, dd)
		let datecard = document.createElement('div')
		datecard.classList.add('text-muted')
		datecard.innerHTML =
			months[pubdate.getMonth()] + ' ' + pubdate.getDate()
		cardcolmain1.appendChild(datecard)

		let abstractcard = document.createElement('div')
		abstractcard.innerHTML = data[k].abstract
		cardcolmain1.appendChild(abstractcard)

		let continuecard = document.createElement('a')
		continuecard.href = data[k].short_url
		continuecard.innerHTML = 'Continue reading'
		continuecard.target = '_blank'
		cardcolmain1.appendChild(continuecard)

		let cardcolmain2 = document.createElement('div')
		cardcolmain2.classList.add('col-4')
		cardrowmain.appendChild(cardcolmain2)

		let thumbnail = document.createElement('img')
		thumbnail.classList.add('w-100', 'h-100')
		thumbnail.src = data[k].multimedia.slice(-1)[0].url
		cardcolmain2.appendChild(thumbnail)
	}
}

generateContent()
