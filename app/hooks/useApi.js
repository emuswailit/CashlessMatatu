import { useEffect, useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState();
  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);

    setLoading(false);
    setError(!response.ok);

    if (response.data && !response.data.results && response.ok) {
      setData(response.data);
    } else if (response.data && response.data.results) {
      setData(response.data.results);
    } else {
      setData(response.data);
    }

    if (!response.ok) {
      setError(true);
      return response;
    } else {
      return response;
    }
  };

  return { data, error, loading, request };
};

export default useApi;
