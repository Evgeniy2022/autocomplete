let rep = document.querySelector(".repo__view");
let repParent = document.querySelector(".repo");
let addRepo = document.querySelector(".repo__save");
let input = document.querySelector(".repo__unput");

document.querySelector("input").addEventListener(
  "input",
  debounce((e) => {
    fetch(
      `https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        renderData(data);
      });
	}, 500)
);

function renderData(data) {
  if (input.value == "" || data.total_count == 0) {
    repParent.classList.remove("active");
    return;
  } else {
	 repParent.classList.add("active");
    rep.innerHTML = "";
    for (let key of data.items) {
      elemAutocomplete(key);
    }
  }
}

function elemAutocomplete(elem) {
  const dropdownItem = document.createElement("div");
  dropdownItem.classList.add("repo__show");
  dropdownItem.innerHTML = `${elem.name}`;
  rep.append(dropdownItem);
  dropdownItem.addEventListener("click", () => {
    addRepositories(elem);
    input.value = "";
	 renderData();
	 rep.innerHTML = "";
  });
}

function addRepositories(item) {
  const addItemList = document.createElement("div");
  addItemList.classList.add("repo__save-item");

  const repoBody = document.createElement("div");
  repoBody.classList.add("repo__save-body");
  addItemList.append(repoBody);

  const repoSaveCalld = document.createElement("div");
  repoSaveCalld.classList.add("repo__save-calledy");
  repoSaveCalld.innerHTML = `
		<div class='repo__save-name'>Name: ${item.name}</div>
		<div class='repo__save-owner'>Owner: ${item.owner.login}</div>
		<div class='repo__save-stars'>Stars: ${item.stargazers_count}</div>
	`;
  repoBody.append(repoSaveCalld);

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("repo__delete");
  btnDelete.innerHTML = `X`;
  repoBody.append(btnDelete);

  btnDelete.addEventListener("click", (e) => {
    addItemList.remove();
  });

  addRepo.append(addItemList);
}

function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

