'use strict'

const BASE_URL = window.location.hostname;

function handleUrls(string) {
  return string.replace('%','%25');
}

function displayResults(array) {
  if(!array) {
    $('#results').html(null);
    return;
  }

  const html = array.map(r => `<li><a href="${handleUrls(BASE_URL+r.location)}">${r.location}</a></li>`);

  $('#results').html('<ul>'+html+'</ul>');
}

$(document).ready(function(){
  const files = window.__print2a_files;

  $('#searchLocation').change(function(e) {
    const search = $(this).val();
    if(search == '') {
      return displayResults();
    }

    const results = files.filter(f => f.location.toLowerCase().indexOf(search.toLowerCase()) > -1);
    displayResults(results);
  });

  $('#searchTag').change(function(e) {
    const search = $(this).val();
    if(search == '') {
      return displayResults();
    }

    const reg = new RegExp(search, 'gi');
    const results = files.filter(f => f.tags.some(t => t.search(reg) > -1));
    displayResults(results);
  });

});