import { useState, useEffect } from "react";
import axios from "axios";

function useAxios(initialUrl, initialData = null) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return { data, error, loading, updateUrl };
}

export default useAxios;
