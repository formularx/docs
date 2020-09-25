/**
 * title: 快速示例
 * desc: \`<Form\>\` 的 effects 属性优雅地声明
 */

import './entry';
import React from 'react';
import { Form, Field } from '@formular/antd';
import { useConstant } from '@formular/react';
import { createForm } from '@formular/core';
import { Button, Modal, message } from 'antd';
import { autorun, reaction } from 'mobx';
import { toStream } from 'mobx-utils';
import { from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

        yield from(toStream(() => value('otherAnimalName')))
          .pipe(debounceTime(500))
          .subscribe((val) => {
            if (['dog', 'cat'].includes(val as string)) {
              message.open({ content: `💗 We all love ${val}s ` } as any);
            }
          });
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
          placeholder: 'try to input "cat" or "dog"',
        }}
        rules={{ required: true, message: 'This field is required' }}
        required
      />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default App;
