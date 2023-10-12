const loadPhone = async (myPhone = '13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${myPhone}`)
    const data = await res.json();
    const phones = data.data
    displayPhone(phones)
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container')
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    phones = phones.slice(0, 12);
    phoneContainer.textContent = ''

    phones.forEach(phone => {
        const phoneCart = document.createElement('div')
        phoneCart.classList = `card bg-base-100 shadow-xl`;
        phoneCart.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <h3> Brand: ${phone.brand}</h3>
                        <div class="card-actions justify-center">
                            <button onclick="handalShowDetails ('${phone.slag}'); show_details_modal.showModal()"  class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCart)
    });
    toggleLoadingSpinner(false)
}

const handaleSearch = () => {
    toggleLoadingSpinner(true)
    const searchFild = document.getElementById('search-fild')
    const searchText = searchFild.value;
    loadPhone(searchText)
}

const handalShowDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = () => {

    show_details_modal.showModal()
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }

}

loadPhone()