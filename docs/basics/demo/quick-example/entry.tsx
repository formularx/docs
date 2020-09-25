import { Registry } from '@formular/react';
import {
  Checkbox,
  Input,
  Select,
  CheckboxGroup,
} from '@formular/antd/es/components';
import 'antd/es/checkbox/style';
import 'antd/es/input/style';
import 'antd/es/select/style';
import 'antd/es/form/style';

Registry.registerGlobalFields({
  CheckboxGroup,
  Checkbox,
  Input,
  Select,
});
