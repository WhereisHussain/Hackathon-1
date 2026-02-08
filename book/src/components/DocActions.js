import React, { useState } from 'react';
import axios from 'axios';
import { Languages, UserCheck, RefreshCw, BookOpen } from 'lucide-react';

const DocActions = ({ content, docId, userProfile = null }) => {
    const [loading, setLoading] = useState(false);
    const [modifiedContent, setModifiedContent] = useState(null);
    const [viewMode, setViewMode] = useState('original'); // 'original', 'personalized', 'urdu'

    const handlePersonalize = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/content/personalize', {
                chapter_id: docId,
                content: content,
                user_background: userProfile || { software: 'Beginner', hardware: 'Beginner' }
            });
            setModifiedContent(res.data.personalized_content);
            setViewMode('personalized');
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleTranslate = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/content/translate', {
                content: content,
                target_language: 'ur'
            });
            setModifiedContent(res.data.translated_content);
            setViewMode('urdu');
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/agents/skill/summarize', {
                content: content
            });
            setModifiedContent(res.data.summary);
            setViewMode('summary');
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={handlePersonalize}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #2e8555', backgroundColor: viewMode === 'personalized' ? '#2e8555' : 'white', color: viewMode === 'personalized' ? 'white' : '#2e8555', cursor: 'pointer' }}
                >
                    <UserCheck size={16} /> Personalize for Me
                </button>
                <button
                    onClick={handleTranslate}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #1a73e8', backgroundColor: viewMode === 'urdu' ? '#1a73e8' : 'white', color: viewMode === 'urdu' ? 'white' : '#1a73e8', cursor: 'pointer' }}
                >
                    <Languages size={16} /> Urdu Translation
                </button>
                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f57c00', backgroundColor: viewMode === 'summary' ? '#f57c00' : 'white', color: viewMode === 'summary' ? 'white' : '#f57c00', cursor: 'pointer' }}
                >
                    <BookOpen size={16} /> Summarize
                </button>
                {viewMode !== 'original' && (
                    <button
                        onClick={() => setViewMode('original')}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #666', backgroundColor: 'white', color: '#666', cursor: 'pointer' }}
                    >
                        <RefreshCw size={16} /> Show Original
                    </button>
                )}
            </div>

            {loading && <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Processing with AI...</div>}

            {viewMode !== 'original' && modifiedContent && (
                <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd', whiteSpace: 'pre-wrap', fontFamily: viewMode === 'urdu' ? 'Noto Sans Arabic, sans-serif' : 'inherit', direction: viewMode === 'urdu' ? 'rtl' : 'ltr' }}>
                    <h3 style={{ marginTop: 0 }}>
                        {viewMode === 'urdu' ? 'مترجمہ مواد' : (viewMode === 'summary' ? 'Chapter Summary' : 'Personalized Content')}
                    </h3>
                    {modifiedContent}
                </div>
            )}
        </div>
    );
};

export default DocActions;
