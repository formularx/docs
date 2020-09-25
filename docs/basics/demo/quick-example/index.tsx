/**
 * title: 快速示例
 * desc: Formular 的优雅之处
 */

import './entry';
import React from 'react';
import { Form, Field } from '@formular/antd';
import { useConstant } from '@formular/react';
import { createForm } from '@formular/core';
import { Button, Modal } from 'antd';
import { autorun, reaction } from 'mobx';
import { fetchOptions } from './services';

const App: React.FC = () => {
  const form = useConstant(() => createForm());
  return (
    <Form
      form={form}
      onFinish={(values) =>
        Modal.success({
          title: 'Values',
          content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
      }
      effects={function* ({ field, value, form }) {
        yield autorun(
          () =>
            (field('favoriteAnimal')!.ignored = !(field(
              'favoriteAnimal',
            )!.show = !!value('isFurry'))) &&
            form.resetFields(['favoriteAnimal']),
        );

        yield autorun(
          () =>
            (field('otherAnimalName')!.ignored = !(field(
              'otherAnimalName',
            )!.show = value('favoriteAnimal') === 'others')) &&
            form.resetFields(['otherAnimalName']),
        );

        yield reaction(
          () => field('favoriteAnimal')?.show,
          async (show) => {
            if (show) {
              const item = field('favoriteAnimal');
              item!.loading = item!.disabled = true;
              item!.enum = await fetchOptions();
              item!.loading = item!.disabled = false;
            }
          },
        );
      }}
    >
      <Field
        name="isFurry"
        initialValue={false}
        label="Do you like animals 🐺"
        component="Checkbox"
        componentProps={({ field }) => ({
          children: field?.value ? 'Yes' : 'Nope',
        })}
      />
      <Field
        name="favoriteAnimal"
        label="What is your favorite animal ❤️"
        component="Select"
        componentProps={{
          style: { width: '40%' },
          placeholder: 'Choose an animal',
        }}
        extra={`When you select "Others", the "Other Animals" input box will appear`}
        rules={{ required: true, message: 'This field is required' }}
        required
      />
      <Field
        name="otherAnimalName"
        label="Other animals 💗"
        component="Input"
        componentProps={{
          style: { width: '40%' },
        }}
        rules={{ required: true, message: 'This field is required' }}
        required
      />
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          console.log(form);
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default App;
