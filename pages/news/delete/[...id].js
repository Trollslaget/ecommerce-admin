import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [newsInfo,setNewsInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/news?id='+id).then(response => {
        setNewsInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push('/news');
  }
  async function deleteNews() {
    await axios.delete('/api/news?id='+id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Удалить новость
        &nbsp;&quot;{newsInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteNews}
          className="btn-red">да</button>
        <button
          className="btn-default"
          onClick={goBack}>
          нет
        </button>
      </div>
    </Layout>
  );
}
