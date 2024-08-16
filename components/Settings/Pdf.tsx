import { IconFileImport, IconPdf } from '@tabler/icons-react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { SupportedExportFormats } from '@/types/export';

import { SidebarButton } from '../Sidebar/SidebarButton';

interface Props {
  onImport: (data: FormData) => Promise<void>;
}

export const PdfUpload: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');
  return (
    <>
      <input
        id="upload-pdf"
        className="sr-only"
        tabIndex={-1}
        type="file"
        multiple
        accept=".pdf"
        onChange={async (e) => {
          if (!e.target.files?.length) return;

          const fileList = e.target.files;
          var formData = new FormData();
          for (var i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
          }
          await onImport(formData);
        }}
      />

      <SidebarButton
        text={t('Add Subject Outline')}
        icon={<IconPdf size={18} />}
        onClick={() => {
          const importFile = document.querySelector(
            '#upload-pdf',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};
