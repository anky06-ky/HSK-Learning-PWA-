import { db } from '../db/database';

export async function exportProgress() {
  try {
    const progress = await db.progress.toArray();
    const vocabularies = await db.vocabularies.toArray();
    
    const data = {
      progress,
      vocabularies,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hsk-progress-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
}

export async function importProgress(file: File): Promise<boolean> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (data.progress && Array.isArray(data.progress)) {
      await db.progress.clear();
      await db.progress.bulkAdd(data.progress);
    }
    
    if (data.vocabularies && Array.isArray(data.vocabularies)) {
      // Optional: merge vocabularies
      // await db.vocabularies.bulkPut(data.vocabularies);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

