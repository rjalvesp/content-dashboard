import React from 'react';
import * as R from 'ramda';
import { FaEdit, FaEye, FaTimes, FaPlus } from 'react-icons/fa';
import { Form, Modal, Tag, Typography } from 'antd';
import AccessMatrixForm from './AccessMatrixForm';
import { AccessMatrixGrid } from '../../components/Grid/Grid';
import {
  AccessMatrixGridHeader,
  ActionHeaderContainer,
} from '../../components/Grid/Header';
import {
  Content,
  CenteredButton,
  ActionContainer,
  Code,
} from '../../components/Common';
import {
  getAccessMatrix,
  setAccessMatrix,
} from '../../services/AccessServices';
import {
  arrayToDictionary,
  pickFromArrayByName,
  parseAccessMatrix,
} from '../../helpers/arrayHandler';

const AccessMatrix = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');
  const [data, setData] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (loaded) {
      return;
    }

    getAccessMatrix()
      .then(setData)
      .finally(() => setLoaded(true));
  }, [loaded]);

  const handleFormOk = () => {
    form
      .validateFields()
      .then(() => {
        setData((oldData) => {
          const value = form.getFieldsValue();
          const { name } = value;
          const oldValue = pickFromArrayByName(name)(data);
          if (!oldValue) {
            oldData.push(value);
          } else {
            oldData = R.pipe(
              arrayToDictionary,
              R.assoc(name, value),
              R.values
            )(oldData);
          }

          setAccessMatrix(parseAccessMatrix(oldData)).finally(() => {
            setFormOpen(false);
            setIdentifier(null);
            form.resetFields();
          });
          return oldData;
        });
      })
      .catch((a) => console.log(a));
  };

  const handleFormCancel = () => {
    setFormOpen(false);
    setIdentifier(null);
    form.resetFields();
  };

  const handleView = () => {
    setViewOpen(false);
    setIdentifier(null);
  };

  const onEdit = (name) => {
    setFormOpen(true);
    setIdentifier(name);
    R.pipe(pickFromArrayByName(name), form.setFieldsValue)(data);
  };

  const onView = (name) => {
    setViewOpen(true);
    setIdentifier(name);
  };

  const onRemove = (name) => {
    R.pipe(arrayToDictionary, R.omit([name]), R.values, setData)(data);
  };
  console.log(data);
  return (
    <Content>
      <Typography.Title level={3}>Access Matrix</Typography.Title>
      <AccessMatrixGridHeader>
        <Typography.Title level={4}>Identifier</Typography.Title>
        <Typography.Title level={4}>Consumable</Typography.Title>
        <ActionHeaderContainer>
          <CenteredButton type="primary" onClick={() => setViewOpen(true)}>
            <FaEye />
          </CenteredButton>
          <CenteredButton type="primary" onClick={() => setFormOpen(true)}>
            <FaPlus />
          </CenteredButton>
        </ActionHeaderContainer>
      </AccessMatrixGridHeader>
      <AccessMatrixGrid>
        {(data || []).map(
          ({
            name,
            channelSlug,
            consumable,
            brandSlug,
            contentType,
            marketSlug,
            distributionSlug,
            tagSlug,
            functionalTag,
          }) => {
            return (
              <>
                <Typography.Title className="cell" level={5}>
                  {name}
                </Typography.Title>
                <Typography.Title className="cell" level={5}>
                  {consumable}
                </Typography.Title>
                <div className="cell">
                  {brandSlug && <Tag color="geekblue">{brandSlug}</Tag>}
                  {(contentType || []).map((row) => (
                    <Tag key={Math.random()} color="blue">
                      {row}
                    </Tag>
                  ))}
                  {(channelSlug || []).map((row) => (
                    <Tag key={Math.random()} color="gold">
                      {row}
                    </Tag>
                  ))}
                  {(marketSlug || []).map((row) => (
                    <Tag key={Math.random()} color="green">
                      {row}
                    </Tag>
                  ))}
                  {(distributionSlug || []).map((row) => (
                    <Tag key={Math.random()} color="cyan">
                      {row}
                    </Tag>
                  ))}
                  {(tagSlug || []).map((row) => (
                    <Tag key={Math.random()} color="red">
                      {row}
                    </Tag>
                  ))}
                  {(functionalTag || []).map((row) => (
                    <Tag key={Math.random()} color="purple">
                      {row}
                    </Tag>
                  ))}
                </div>
                <ActionContainer className="cell">
                  <CenteredButton onClick={() => onView(name)}>
                    <FaEye />
                  </CenteredButton>
                  <CenteredButton onClick={() => onEdit(name)}>
                    <FaEdit />
                  </CenteredButton>
                  <CenteredButton onClick={() => onRemove(name)}>
                    <FaTimes />
                  </CenteredButton>
                </ActionContainer>
              </>
            );
          }
        )}
      </AccessMatrixGrid>

      {formOpen ? (
        <Modal
          title={`${identifier ? 'Edit' : 'New'} identifier`}
          visible={true}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
        >
          <AccessMatrixForm form={form} />
        </Modal>
      ) : null}
      {viewOpen ? (
        <Modal
          title={`${identifier || ''} JSON`}
          visible={true}
          onOk={handleView}
          onCancel={handleView}
        >
          <Code>
            {JSON.stringify(
              identifier
                ? R.pipe(
                    pickFromArrayByName(identifier),
                    parseAccessMatrix
                  )(data)
                : parseAccessMatrix(data),
              null,
              2
            )}
          </Code>
        </Modal>
      ) : null}
    </Content>
  );
};

export default AccessMatrix;
