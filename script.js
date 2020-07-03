let main = document.createElement('div')
main.classList.add('margin-center')
document.body.appendChild(main)

let container = document.createElement('div')
container.classList.add('container-fluid')
main.appendChild(container)

let titlerow = document.createElement('div')
titlerow.classList.add('row')
container.appendChild(titlerow)

let papertitle = document.createElement('div')
papertitle.classList.add('col-12', 'h1', 'text-center', 'title', 'cursor')
papertitle.innerHTML = 'THE PERTINENT TIMES'
papertitle.addEventListener('click', () => {
	generateContent()
})
titlerow.appendChild(papertitle)

let minimizerow = document.createElement('div')
minimizerow.classList.add('col-12', 'h1', 'text-center', 'title', 'cursor')
container.appendChild(minimizerow)

let minimize = document.createElement('a')
minimize.classList.add('col-12')
minimizerow.appendChild(minimize)

let span = document.createElement('span')
span.classList.add('material-icons')
span.innerHTML = 'expand_more'
span.setAttribute('data-target', '#section')
span.setAttribute('data-toggle', 'collapse')
span.addEventListener('click', () => {
	if (span.innerHTML === 'expand_less') span.innerHTML = 'expand_more'
	else span.innerHTML = 'expand_less'
})
minimize.appendChild(span)

let sections = [
	'Home',
	'World',
	'Politics',
	'Magazine',
	'Technology',
	'Science',
	'Health',
	'Sports',
	'Arts',
	'Fashion',
	'Food',
	'Travel',
]

let sectionrow = document.createElement('div')
sectionrow.classList.add('collapse')
sectionrow.id = 'section'
container.appendChild(sectionrow)

let sectionrow1 = document.createElement('div')
sectionrow1.classList.add('row', 'border-top', 'border-bottom', 'py-3', 'mb-3')
sectionrow.appendChild(sectionrow1)

for (let sec of sections) {
	let sectioncol = document.createElement('button')
	sectioncol.classList.add(
		'col-lg-1',
		'col-md-3',
		'col-sm-6',
		'text-center',
		'cursor',
		'p-0',
		'btn'
	)
	sectioncol.innerHTML = sec.toUpperCase()
	sectioncol.id = sec.toLowerCase()
	sectioncol.addEventListener('click', () => {
		generateContent(sec.toLowerCase())
	})
	sectioncol.addEventListener('mouseover', () => {
		sectioncol.classList.add('bg-dark', 'text-white')
	})
	sectioncol.addEventListener('mouseout', () => {
		sectioncol.classList.remove('bg-dark', 'text-white')
	})

	sectionrow1.appendChild(sectioncol)
}

let content = document.createElement('div')
content.classList.add('row')
// content.id = 'content'
container.appendChild(content)

async function generateContent(section = 'home') {
	try {
		content.innerHTML = ''
		let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=Sa9FA7OOineRnv899gA6Zc8wjOpb6J1V`
		let data = (await (await fetch(url)).json()).results
		// console.log()

		for (let k in data) {
			let colcard = document.createElement('div')
			colcard.classList.add('col-12', 'p-0', 'mb-3')
			content.appendChild(colcard)

			let card = document.createElement('div')
			card.classList.add(
				'card',
				'm-0',
				'card-dimension',
				'border-dark',
				'shadow'
			)
			colcard.appendChild(card)

			let cardcontainer = document.createElement('div')
			cardcontainer.classList.add('container-fluid')
			card.appendChild(cardcontainer)

			let cardrowmain = document.createElement('div')
			cardrowmain.classList.add('row', 'p-0')
			cardcontainer.appendChild(cardrowmain)

			let cardcolmain1 = document.createElement('div')
			cardcolmain1.classList.add(
				'col-lg-8',
				'col-md-8',
				'col-sm-12',
				'p-0'
			)
			cardrowmain.appendChild(cardcolmain1)

			let cardcol1container = document.createElement('div')
			cardcol1container.classList.add('container-fluid')
			cardcolmain1.appendChild(cardcol1container)

			let cardcol1row1 = document.createElement('div')
			cardcol1row1.classList.add('row', 'mt-3')
			cardcol1container.appendChild(cardcol1row1)

			let cardcol1col1 = document.createElement('div')
			cardcol1col1.classList.add('col')
			cardcol1row1.appendChild(cardcol1col1)

			let sectioncard = document.createElement('div')
			sectioncard.classList.add('text-primary', 'font-weight-bold', 'h5')
			sectioncard.innerHTML = data[k].section.toUpperCase()
			cardcol1col1.appendChild(sectioncard)

			let cardcol1row2 = document.createElement('div')
			cardcol1row2.classList.add('row')
			cardcol1container.appendChild(cardcol1row2)

			let cardcol1col2 = document.createElement('div')
			cardcol1col2.classList.add('col')
			cardcol1row2.appendChild(cardcol1col2)

			let titlecard = document.createElement('div')
			titlecard.classList.add('h3', 'font-weight-bold')
			titlecard.innerHTML = data[k].title
			cardcol1col2.appendChild(titlecard)

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
			let cardcol1row3 = document.createElement('div')
			cardcol1row3.classList.add('row')
			cardcol1container.appendChild(cardcol1row3)

			let cardcol1col3 = document.createElement('div')
			cardcol1col3.classList.add('col')
			cardcol1row3.appendChild(cardcol1col3)

			let pubdate = new Date(yy, mm - 1, dd)
			let datecard = document.createElement('div')
			datecard.classList.add('text-muted')
			datecard.innerHTML =
				months[pubdate.getMonth()] + ' ' + pubdate.getDate()
			cardcol1col3.appendChild(datecard)

			let cardcol1row4 = document.createElement('div')
			cardcol1row4.classList.add('row')
			cardcol1container.appendChild(cardcol1row4)

			let cardcol1col4 = document.createElement('div')
			cardcol1col4.classList.add('col')
			cardcol1row4.appendChild(cardcol1col4)

			let abstractcard = document.createElement('div')
			abstractcard.innerHTML = data[k].abstract
			cardcol1col4.appendChild(abstractcard)

			let cardcol1row5 = document.createElement('div')
			cardcol1row5.classList.add('row')
			cardcol1container.appendChild(cardcol1row5)

			let cardcol1col5 = document.createElement('div')
			cardcol1col5.classList.add('col', 'mb-3')
			cardcol1row5.appendChild(cardcol1col5)

			let continuecard = document.createElement('a')
			continuecard.href = data[k].short_url
			continuecard.innerHTML = 'Continue reading'
			continuecard.target = '_blank'
			cardcol1col5.appendChild(continuecard)

			let cardcolmain2 = document.createElement('div')
			cardcolmain2.classList.add(
				'col-lg-4',
				'col-md-4',
				'col-sm-12',
				'p-0'
			)
			cardrowmain.appendChild(cardcolmain2)

			let thumbnail = document.createElement('img')
			thumbnail.classList.add('w-100', 'h-100', 'overflow-hidden', 'p-0')
			thumbnail.src = data[k].multimedia.slice(-1)[0].url
			cardcolmain2.appendChild(thumbnail)
		}
	} catch (err) {
		alert(err)
	}
}

generateContent()
