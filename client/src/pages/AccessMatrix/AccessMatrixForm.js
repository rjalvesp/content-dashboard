import { Form, Input, Select, Typography } from 'antd';
import React from 'react';

const AccessMatrixForm = ({ form, initialValues }) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      initialValues={initialValues}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      form={form}
    >
      <Typography.Title level={5}>Description</Typography.Title>
      <Form.Item
        label="Identifier"
        name="name"
        rules={[{ required: true, message: 'Field required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Consumable"
        name="consumable"
        // rules={[{ required: true, message: 'Field required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Brand" name="brandSlug">
        <Input />
      </Form.Item>
      <Form.Item label="Channel" name="channelSlug">
        <Select mode="tags" placeholder="Channels" />
      </Form.Item>
      <Form.Item label="Market" name="marketSlug">
        <Select mode="tags" placeholder="Markets" />
      </Form.Item>
      <Form.Item label="Distribution" name="distributionSlug">
        <Select mode="tags" placeholder="Distribution" />
      </Form.Item>
      <Form.Item label="Tags" name="tagSlug">
        <Select mode="tags" placeholder="Tags" />
      </Form.Item>
      <Form.Item label="Content Type" name="contentType">
        <Select mode="tags" placeholder="Content Types" />
      </Form.Item>
      <Form.Item label="Functional Tags" name="functionalTag">
        <Select mode="tags" placeholder="Functional Tags" />
      </Form.Item>
    </Form>
  );
};

export default AccessMatrixForm;
