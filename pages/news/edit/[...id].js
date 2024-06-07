import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

import NewsForm from "@/components/NewsForm";

export default function EditProductPage() {
  const [newsInfo, setNewsInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/news?id='+id).then(response => {
        setNewsInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Редактировать новость</h1>
      {newsInfo && (
        <NewsForm {...newsInfo} />
      )}
    </Layout>
  );
}