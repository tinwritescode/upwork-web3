import { useRouter } from "next/router";
import React from "react";

function JobDetail() {
  const router = useRouter();
  const { slug } = router.query;

  return <div>JobDetail</div>;
}

export default JobDetail;
