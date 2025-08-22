import { useState, useCallback } from 'react';
import { useToasts } from '../components/Toast';

export const useFileUpload = () => {
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const { addToast } = useToasts();
    const fileInputRef = useState<HTMLInputElement | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!allowedTypes.includes(file.type)) {
                addToast('error', 'Formato de archivo no permitido. Solo se aceptan imágenes y Excel.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                addToast('error', 'El archivo es muy grande. El límite es 5MB.');
                return;
            }

            setAttachedFile(file);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setFilePreview(reader.result as string);
                reader.readAsDataURL(file);
            } else {
                setFilePreview(null);
            }
        }
    }, [addToast]);
    
    const resetFileState = useCallback(() => {
        setAttachedFile(null);
        setFilePreview(null);
        if (fileInputRef[0]) {
            fileInputRef[0].value = '';
        }
    }, [fileInputRef]);

    const open = () => fileInputRef[0]?.click();

    const getInputProps = () => ({
        ref: (node: HTMLInputElement) => { fileInputRef[0] = node; },
        type: "file",
        onChange: handleFileChange,
        accept: "image/jpeg,image/png,image/webp,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        className: "hidden",
    });

    return {
        attachedFile,
        filePreview,
        userInput,
        setUserInput,
        handleFileChange,
        resetFileState,
        open,
        getInputProps
    };
};
