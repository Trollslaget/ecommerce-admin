import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { storage } from "@/firebase";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import CroppComponent from "@/components/CroppComponent";
import { data } from "autoprefixer";
export default function NewsForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	images: existingImages,
	category: assignedCategory,
	properties: assignedProperties,
}) {
	const [title, setTitle] = useState(existingTitle || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [category, setCategory] = useState(assignedCategory || "");
	const [productProperties, setProductProperties] = useState(
		assignedProperties || {}
	);


	const [images, setImages] = useState(existingImages || []);
	const [goToNews, setGoToNews] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	
	const router = useRouter();

	async function saveNews(ev) {
		ev.preventDefault();
		console.log(images);
		const data = {
			title,
			description,
			
			images,
			
		
		};
		console.log(data);
		if (_id) {
			//update
			await axios.put("/api/news", { ...data, _id });
		} else {
			//create
			await axios.post("/api/news", data);
		}
		setGoToNews(true);
	}
	if (goToNews) {
		router.push("/news");
	}
	async function uploadImages(ev) {
		const fileName = Date.now() + "_" + Math.random().toString(36).substr(2, 9);

		const myRef = ref(storage, `images/${fileName}`);

		const task = uploadBytesResumable(myRef, ev);
		setIsUploading(true);

		task.on(
			"state_changed",
			(snapshot) => {
				const percentage = (
					(snapshot.bytesTransferred / snapshot.totalBytes) *
					100
				).toFixed();
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(task.snapshot.ref)
					.then((url) => {
						console.log(url, "после запроса");
						setImages((oldImages) => {
							if (oldImages) {
								return [...oldImages, url];
							}
							return [url];
						});
					})
					.then(setIsUploading(false))
					.then(console.log(images));
			}
		);
	}
	function updateImagesOrder(images) {
		setImages(images);
	}
	function setProductProp(propName, value) {
		setProductProperties((prev) => {
			const newProductProps = { ...prev };
			newProductProps[propName] = value;
			return newProductProps;
		});
	}
	const removeImage = (index) => {
		setImages((prevImages) => {
			const updatedImages = [...prevImages];
			updatedImages.splice(index, 1);
			return updatedImages;
		});
	};
	// const propertiesToFill = [];
	// if (categories.length > 0 && category) {
	// 	let catInfo = categories.find(({ _id }) => _id === category);
	// 	propertiesToFill.push(...catInfo.properties);
	// 	while (catInfo?.parent?._id) {
	// 		const parentCat = categories.find(
	// 			({ _id }) => _id === catInfo?.parent?._id
	// 		);
	// 		propertiesToFill.push(...parentCat.properties);
	// 		catInfo = parentCat;
	// 	}
	// }

	return (
		<form onSubmit={saveNews}>
			<label>Заголовок</label>
			<input
				type='text'
				placeholder='Введите заголовок'
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
			/>
			{/* <label>Категория</label>
			<select value={category} onChange={(ev) => setCategory(ev.target.value)}>
				<option value=''>Без категории</option>
				{categories.length > 0 &&
					categories.map((c) => (
						<option key={c._id} value={c._id}>
							{c.name}
						</option>
					))}
			</select>
			{propertiesToFill.length > 0 &&
				propertiesToFill.map((p) => (
					<div key={p.name} className=''>
						<label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
						<div>
							<select
								value={productProperties[p.name]}
								onChange={(ev) => setProductProp(p.name, ev.target.value)}
							>
								{p.values.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</select>
						</div>
					</div>
				))} */}
			<label>Фото</label>

			<div className='mb-2 flex flex-wrap gap-1'>
				<ReactSortable
					list={images}
					className='flex flex-wrap gap-1'
					setList={updateImagesOrder}
				>
					{!!images?.length && (
						<div className='flex flex-wrap'>
							{images.map((link, index) => (
								<div key={link} className='relative h-32 m-1'>
									<img src={link} alt='' className='rounded-md' />

									<img
										className='absolute top-0 right-0 cursor-pointer  bg-white opacity-75 hover:opacity-100 transition-all  h-5 p-0.5'
										onClick={() => removeImage(index)}
										src='/icons8-close.svg'
									></img>
								</div>
							))}
						</div>
					)}
				</ReactSortable>
				{isUploading && (
					<div className='h-24 flex items-center'>
						<Spinner />
					</div>
				)}
			</div>
			<CroppComponent uploadImages={uploadImages} />
			<label>Описание</label>
			<textarea
				placeholder='описание'
				value={description}
				onChange={(ev) => setDescription(ev.target.value)}
			/>
			{/* <label>Цена (USD)</label>
			<input
				type='number'
				placeholder='цена'
				value={price}
				onChange={(ev) => setPrice(ev.target.value)}
			/> */}
			<button type='submit' className='btn-primary'>
				Сохранить
			</button>
		</form>
	);
}
