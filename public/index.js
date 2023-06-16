const AUTOFILL_LIST = [
        'https://archive.org/details/waycross',
        'https://archive.org/details/whatvme',
        'https://archive.org/details/kmvt15',
        'https://archive.org/details/magazine_rack',
        'https://archive.org/details/oldtimeradio',
        'https://archive.org/details/free_sample_zone',
        'https://archive.org/details/vhskids',
        'https://archive.org/details/popularmagazine',
        'https://archive.org/details/softwarelibrary_msdos_zzt',
        'https://archive.org/details/standardebooks',
        'https://archive.org/details/cdromsoftware',
        'https://archive.org/details/magazineart-pensandoffice',
        'https://archive.org/details/wyouct',
        'https://archive.org/details/racertrash_archive',
        'https://archive.org/details/terminal-escape-collection'
      ];

const VALID_LINK_REGEX = /\/\/archive.org\/details\/([^\/]+)\/?$/;
 
window.addEventListener("load", () => {
  const inputField = document.querySelector('#collectionInput');
  if (window.location.hash.length > 0) {
    inputField.value = 'https://archive.org/details/' + atob(decodeURIComponent(window.location.hash.slice(1)))
  }
  
  
  const wagTheBox = () => {
   inputField.reportValidity();
  }  
  
  const updateState = () => {
    updateTheURL();
    changeTheLink();
  }
  
  const updateTheURL = () => {
    const linkFormat = inputField.value.match(VALID_LINK_REGEX);
    if (linkFormat !== null) {
      const encodedValue = encodeURIComponent(btoa(linkFormat[1]));
      window.location.hash = encodedValue;
    }
    
  }
  
  const changeTheLink = () => {
    const theLink = document.querySelector('#theLink');
    const theCTA = document.querySelector('#theCTA');
    const theTaunt = document.querySelector('#theTaunt');

    if (!inputField.value.match(VALID_LINK_REGEX)) {
      theLink.onclick = wagTheBox;
      theCTA.classList.add("hidden");
      theTaunt.classList.remove("hidden");
      inputField.setCustomValidity("");
      inputField.setCustomValidity("Must match 'archive.org/details/${collectionName}'");
    } else {
      theTaunt.classList.add("hidden");
      theCTA.classList.remove("hidden");
      theLink.removeAttribute("onclick");
      theLink.href = `/redirect?url=${encodeURIComponent(inputField.value)}`;
      inputField.setCustomValidity("");
    }
  }

  inputField.addEventListener("input", updateState);
  inputField.addEventListener("change", updateState);
  updateState();

  const autofillCollectionField = (e) => {
    e.preventDefault();
    const noRepeats = AUTOFILL_LIST.filter((x) => x !== inputField.value);
    inputField.value = noRepeats[Math.floor(Math.random() * noRepeats.length)];
    updateState();
  };
  const giveMeOneButton = document.querySelector('.starburst button').addEventListener("click", autofillCollectionField);
});