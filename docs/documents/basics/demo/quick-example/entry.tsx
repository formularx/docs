import { Registry } from '@formular/react';
import { Checkbox, Input, Select } from '@formular/antd/es/components';
import 'antd/es/checkbox/style';
import 'antd/es/input/style';
import 'antd/es/select/style';
import 'antd/es/form/style';

Registry.registerGlobalFields({
  Checkbox,
  Input,
  Select,
});
