import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Save,
  FileText,
  Tag,
  Calendar,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  template?: string;
}

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const noteTemplates = {
  'ethics-case': {
    name: 'Ethics Case Study',
    content: `# Ethics Case Study

## Case Background
[Describe the situation and context]

## Stakeholders Involved
- 
- 
- 

## Ethical Issues
1. 
2. 
3. 

## Possible Actions
### Option 1:
**Action:** 
**Pros:** 
**Cons:** 

### Option 2:
**Action:** 
**Pros:** 
**Cons:** 

## Recommended Course of Action
[Your recommendation with justification]

## Learning Points
- 
- 
- 
`
  },
  'mains-answer': {
    name: 'Mains Answer Format',
    content: `# [Question Topic]

## Introduction
[Brief introduction to the topic - 2-3 lines]

## Body

### Point 1: [Main argument]
- **Explanation:** 
- **Example/Case Study:** 
- **Implication:** 

### Point 2: [Second argument]
- **Explanation:** 
- **Example/Case Study:** 
- **Implication:** 

### Point 3: [Third argument]
- **Explanation:** 
- **Example/Case Study:** 
- **Implication:** 

## Way Forward
[Constructive suggestions and solutions]

## Conclusion
[Balanced conclusion tying everything together]

---
**Word Count:** [Aim for 200-250 words]
`
  },
  'essay-plan': {
    name: 'Essay Brainstorming',
    content: `# Essay Topic: [Title]

## Key Themes to Cover
- 
- 
- 

## Introduction Ideas
- Hook: 
- Context: 
- Thesis: 

## Body Structure

### Para 1: [Theme]
- Main point: 
- Supporting evidence: 
- Examples: 

### Para 2: [Theme]
- Main point: 
- Supporting evidence: 
- Examples: 

### Para 3: [Theme]
- Main point: 
- Supporting evidence: 
- Examples: 

## Conclusion Ideas
- Summary: 
- Broader implications: 
- Call to action: 

## Quotes & Statistics
- 
- 
- 

## Potential Counterarguments
- 
- 
`
  }
};

const subjects = [
  'Ethics', 'Polity', 'Economics', 'Geography', 'History', 
  'Science & Technology', 'Environment', 'Current Affairs', 'Essay Writing',
  'Optional Subject', 'General Studies'
];

const formatButtons = [
  { icon: Bold, label: 'Bold', format: '**text**' },
  { icon: Italic, label: 'Italic', format: '*text*' },
  { icon: Underline, label: 'Underline', format: '<u>text</u>' },
  { icon: Heading1, label: 'Heading 1', format: '# ' },
  { icon: Heading2, label: 'Heading 2', format: '## ' },
  { icon: List, label: 'Bullet List', format: '- ' },
  { icon: ListOrdered, label: 'Numbered List', format: '1. ' },
  { icon: Quote, label: 'Quote', format: '> ' },
];

export default function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [subject, setSubject] = useState(note?.subject || 'Ethics');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFormatClick = (format: string) => {
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    if (format.includes('text')) {
      newText = format.replace('text', selectedText || 'text');
    } else {
      newText = format + selectedText;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleTemplateSelect = (templateKey: string) => {
    if (templateKey && noteTemplates[templateKey as keyof typeof noteTemplates]) {
      const template = noteTemplates[templateKey as keyof typeof noteTemplates];
      setContent(template.content);
      setTitle(template.name);
      setSelectedTemplate('');
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      content,
      subject,
      tags,
      template: selectedTemplate
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose a Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {Object.entries(noteTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleTemplateSelect(key)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {template.name}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave} disabled={!title.trim()}>
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Note Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title and Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Subject
              </label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subj => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Content
            <div className="flex items-center space-x-1">
              {formatButtons.map(({ icon: Icon, label, format }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFormatClick(format)}
                  title={label}
                  className="h-8 w-8 p-0"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note... You can use markdown formatting."
            className="min-h-96 font-mono text-sm"
            style={{ resize: 'vertical' }}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
            <span>{content.length} characters</span>
            <span>Supports markdown formatting</span>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {content && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div 
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-3 mb-2">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-2 mb-1">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
                    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600">$1</blockquote>')
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
