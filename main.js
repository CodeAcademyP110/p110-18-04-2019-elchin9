"use strict";

const cities = document.querySelector('.cities');
const seas = document.querySelector('.sea');
const all = document.querySelector('.all');
const tags = document.querySelectorAll('.tag');
const menu = document.querySelector('.menu');
const images = document.querySelectorAll('.image');
const gallery = document.querySelector('.gallery');
const desc = document.querySelector('.desc');
const asc = document.querySelector('.asc');

[...tags].map(tag => {

	tag.onclick = function()
	{
		document.querySelector('.menu li.active').classList.remove("active");
        this.classList.add("active");  
    }

});

desc.onclick = function()
{
    asc.classList.remove('active');
	desc.classList.add('active');
}
asc.onclick = function(){
	desc.classList.remove('active');
	asc.classList.add('active');
}

//Homework 2

window.onload = function(){

	const uploadButton = document.querySelector('.uploadButton');
	const upload = document.querySelector('.upload');
	const photos = document.querySelector('.photos');
	const audio = document.querySelector('.audio');
	const video = document.querySelector('.video');
	const report = document.querySelector('.report');

	uploadButton.onclick = () => 
	{ 
		document.querySelector('#inputUpload').click();
	}

    upload.ondragover = function(e)
    {
    	e.preventDefault();
    	upload.classList.add('dragover');
    	console.log('dfgdf');
    }
    upload.ondragleave = function(e) {
        upload.classList.remove("dragover");
    }
     upload.ondrop = (e) => {
        e.preventDefault();
        ImagesUploader([...e.dataTransfer.files]);
        upload.classList.remove("dragover");
    }
    
    document.querySelector('#inputUpload').onchange = function(e)
    {
        ImagesUploader([...e.target.files]);
    }

     function ImagesUploader(files)
    {
        files.forEach(file => 
        {

        	let uploadedImageCount = 0;
        	let uploadedFileSize = 0;
        	let uploadedAudioCount = 0;
        	let uploadedVideoCount = 0;


            if(file.type.match("image/*").length)
            {
                
                const reader = new FileReader();
                reader.onloadend = function(event)
                {
                	uploadedImageCount++;
                    const image = document.createElement('img');
                    image.classList.add("upload-photo");
                    image.src = event.target.result;
                    uploadedFileSize += file.size;
                    photos.appendChild(image);  
                }
                reader.readAsDataURL(file);
            }
            if(file.type.match("audio/*"))
            {
                
                const reader = new FileReader();
                reader.onloadend = function(event)
                {
                    uploadedAudioCount++;
               
                    const div = document.createElement('div');
                    const p = document.createElement('p');
                    div.classList.add("upload-audio");
                    div.innerHTML = "<i class='fas fa-headphones-alt'></i>";
                    p.innerText = file.name;
                    div.appendChild(p);
                    audio.appendChild(div);
                    uploadedFileSize += file.size;
                }
                reader.readAsDataURL(file);
            }
            if(file.type.match("video/*"))
            {
                
                const reader = new FileReader();
                reader.onloadend = function(event)
                {
                    uploadedVideoCount++;
               
                    const div = document.createElement('div');
                    const p = document.createElement('p');
                    div.classList.add("upload-video");
                    div.innerHTML = "<i class='fas fa-video'></i>";
                    p.innerText = file.name;
                    div.appendChild(p);
                    video.appendChild(div);
                    uploadedFileSize += file.size;
                }
                reader.readAsDataURL(file);
            };
            setTimeout(() =>{
             report.classList.add('d-block');
             report.innerHTML = uploadedImageCount +  "&nbsp" + "şəkil," + "&nbsp" +
                                uploadedAudioCount +  "&nbsp" + "audio," + "&nbsp" +
                                uploadedVideoCount +  "&nbsp" + "video," + "&nbsp" + "yükləndi" +
                                "<br>" +
                                "Ümumi ölçü:" + "&nbsp" + ((uploadedFileSize / 1024) / 1024).toFixed(2) + "&nbsp" + "mb";
            }, 2000);
            setTimeout(() => {
            report.classList.remove('d-block');
            report.classList.add('d-none');
        }, 6000);
        })
    }
}