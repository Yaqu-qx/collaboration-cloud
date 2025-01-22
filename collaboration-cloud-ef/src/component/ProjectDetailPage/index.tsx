import React, { useState } from "react";
import './index.scss';
import { Button } from 'antd';


export default function ProjectDetailPage() {

  return (
    <div>
      <h1>Project Detail Page</h1>
      <Button onClick = {() => window.history.back()}>back</Button>
    </div>
  )
}