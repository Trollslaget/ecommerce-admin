import React, { useState, useRef } from "react";

import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	Crop,
	PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "../helpers/ImageCropper/canvasPreview";
import { useDebounceEffect } from "../helpers/ImageCropper/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

export default function CroppComponent({
	uploadImages,
	uploadBytesResumable,
	storage,
	getDownloadURL,
	setImages,
}) {
	const [imgSrc, setImgSrc] = useState("");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const hiddenAnchorRef = useRef(null);
	const blobUrlRef = useRef("");
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState(1);
	const [imageEvent, setImageEvent] = useState();

	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result?.toString() || "")
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	}

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	function onDownloadCropClick() {
		if (!previewCanvasRef.current) {
			throw new Error("Crop canvas does not exist");
		}

		
		previewCanvasRef.current.toBlob((blob) => {

			uploadImages(blob);
		});
		setImgSrc('')
		setCompletedCrop('')
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);



	return (
		<div className='Cropp'>
			<div className='Crop-Controls'>
				<label className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
						/>
					</svg>
					<div>Загрузить</div>
					<input
						className='hidden'
						type='file'
						accept='image/*'
						onChange={(ev) => {
					
							onSelectFile(ev);
						}}
					/>
				</label>
				<div>
					<label className={!imgSrc ? "hidden" : ""} htmlFor='scale-input'>
						Размер:{" "}
					</label>
					<input
						className={!imgSrc ? "hidden" : ""}
						id='scale-input'
						type='number'
						step='0.1'
						value={scale}
						disabled={!imgSrc}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
				</div>

				<div>
			
				</div>
			</div>
			<div className="block md:flex">
				{" "}
				{!!imgSrc && (
					<ReactCrop 
						crop={crop}
						onChange={(_, percentCrop) => setCrop(percentCrop)}
						onComplete={(c) => setCompletedCrop(c)}
						aspect={aspect}
					>
						<img
							ref={imgRef}
							alt='Crop me'
							src={imgSrc}
							style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
							onLoad={onImageLoad}
						/>
					</ReactCrop>
				)}
				{!!completedCrop && (
					<>
						<div  style={{ paddingLeft: "20px" }}>
							<canvas className="hidden md:flex"	
								ref={previewCanvasRef}
								style={{
									border: "1px solid black",
									objectFit: "contain",
									width: completedCrop.width,
									height: completedCrop.height,
								}}
							/>
						</div>

					
					</>
				)}
			</div>
			<button
				className={!completedCrop ? "hidden " : "btn-primary  mt-2"}
				disabled={!completedCrop}
				onClick={async (ev) => {
					ev.preventDefault();
					await onDownloadCropClick();
			
				}}
			>
				
				Подтвердить
			</button>
		</div>
	);
}
