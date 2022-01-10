import React from 'react';
import * as R from 'ramda';
import { FaEdit, FaEye, FaTimes, FaPlus } from 'react-icons/fa';
import { Form, Modal, Tag, Typography } from 'antd';
import RestrictedAccessForm from './RestrictedAccessForm';
import { RestrictedAccessGrid } from '../../components/Grid/Grid';
import {
  RestrictedAccessGridHeader,
  ActionHeaderContainer,
} from '../../components/Grid/Header';
import {
  Content,
  CenteredButton,
  ActionContainer,
  Code,
} from '../../components/Common';
import { getRestrictedAccess } from '../../services/AccessServices';
import {
  arrayToDictionary,
  pickFromArrayByName,
} from '../../helpers/arrayHandler';
import { downloadCustomJSON } from '../../helpers/fileHandler';

const RestrictedAccess = () => {
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

    getRestrictedAccess()
      .then(setData)
      .finally(() => setLoaded(true));
  }, [loaded]);

  const handleFormOk = () => {
    form
      .validateFields()
      .then(() => {
        const value = form.getFieldsValue();
        setData((oldData) => {
          oldData.push(value);
          return oldData;
        });
        setFormOpen(false);
        setIdentifier(null);
        form.resetFields();
      })
      .catch(console.log);
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

  const onUpload = () => {
    downloadCustomJSON(data, 'restricted-access.json');
  };

  return (
    <Content>
      <Typography.Title level={3}>Restricted Content</Typography.Title>
      <RestrictedAccessGridHeader>
        <Typography.Title level={4}>Identifier</Typography.Title>
        <ActionHeaderContainer>
          <CenteredButton type="primary" onClick={onUpload}>
            Upload
          </CenteredButton>
          <CenteredButton type="primary" onClick={() => setViewOpen(true)}>
            <FaEye />
          </CenteredButton>
          <CenteredButton type="primary" onClick={() => setFormOpen(true)}>
            <FaPlus />
          </CenteredButton>
        </ActionHeaderContainer>
      </RestrictedAccessGridHeader>
      <RestrictedAccessGrid>
        {(data || []).map(
          ({
            name,
            channelSlug,
            contentType,
            brandSlug,
            marketSlug,
            distributionSlug,
            tagSlug,
            functionalTag,
            unless,
          }) => {
            return (
              <>
                <Typography.Title className="cell" level={5}>
                  {name}
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
                <div className="cell">
                  Unless:
                  {unless && (
                    <div>
                      {(unless.contentType || []).map((row) => (
                        <Tag key={Math.random()} color="blue">
                          {row}
                        </Tag>
                      ))}
                      {(unless.channelSlug || []).map((row) => (
                        <Tag key={Math.random()} color="gold">
                          {row}
                        </Tag>
                      ))}
                      {(unless.marketSlug || []).map((row) => (
                        <Tag key={Math.random()} color="green">
                          {row}
                        </Tag>
                      ))}
                      {(unless.distributionSlug || []).map((row) => (
                        <Tag key={Math.random()} color="cyan">
                          {row}
                        </Tag>
                      ))}
                      {(unless.tagSlug || []).map((row) => (
                        <Tag key={Math.random()} color="red">
                          {row}
                        </Tag>
                      ))}
                      {(unless.functionalTag || []).map((row) => (
                        <Tag key={Math.random()} color="purple">
                          {row}
                        </Tag>
                      ))}
                    </div>
                  )}
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
      </RestrictedAccessGrid>

      {formOpen ? (
        <Modal
          title={`${identifier ? 'Edit' : 'New'} identifier`}
          visible={true}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
        >
          <RestrictedAccessForm form={form} />
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
              identifier ? pickFromArrayByName(identifier)(data) : data,
              null,
              2
            )}
          </Code>
        </Modal>
      ) : null}
    </Content>
  );
};

export default RestrictedAccess;
