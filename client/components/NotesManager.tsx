import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Plus,
  Tag,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  Star,
  Archive,
  Filter,
  Download,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import NoteEditor from "./NoteEditor";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  template?: string;
  isStarred?: boolean;
  isArchived?: boolean;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Ethics Case Study: Whistleblowing in Government',
    content: `# Ethics Case Study: Whistleblowing in Government

## Case Background
A senior government official discovers that their department is engaging in corrupt practices...

## Stakeholders Involved
- The whistleblower (senior official)
- Department colleagues
- Public interest
- Government reputation

## Ethical Issues
1. Duty to public vs loyalty to organization
2. Personal career implications
3. Potential harm to ongoing projects

## Recommended Course of Action
Report through proper channels while protecting sensitive information...`,
    subject: 'Ethics',
    tags: ['case-study', 'whistleblowing', 'corruption'],
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 15),
    isStarred: true
  },
  {
    id: '2',
    title: 'Constitutional Provisions for Emergency',
    content: `# Constitutional Provisions for Emergency

## Types of Emergency
1. National Emergency (Article 352)
2. State Emergency (Article 356)
3. Financial Emergency (Article 360)

## Key Features
- Declaration process
- Parliamentary approval
- Duration and review
- Fundamental rights impact

## Recent Examples
- 1975 Emergency
- President's Rule cases
- COVID-19 response`,
    subject: 'Polity',
    tags: ['constitution', 'emergency', 'articles'],
    createdAt: new Date(2024, 0, 12),
    updatedAt: new Date(2024, 0, 14),
    isStarred: false
  },
  {
    id: '3',
    title: 'Economic Survey 2024 - Key Highlights',
    content: `# Economic Survey 2024 - Key Highlights

## Growth Projections
- GDP growth: 6.5-7%
- Manufacturing sector recovery
- Services sector trends

## Policy Recommendations
- Infrastructure investment
- Digital transformation
- Skill development

## Challenges
- Inflation management
- Employment generation
- Global economic headwinds`,
    subject: 'Economics',
    tags: ['economic-survey', '2024', 'gdp', 'policy'],
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 10),
    isStarred: false
  }
];

const subjects = [
  'All Subjects', 'Ethics', 'Polity', 'Economics', 'Geography', 'History', 
  'Science & Technology', 'Environment', 'Current Affairs', 'Essay Writing'
];

const allTags = Array.from(new Set(mockNotes.flatMap(note => note.tags)));

export default function NotesManager() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'All Subjects' || note.subject === selectedSubject;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags.includes(tag));
    
    return matchesSearch && matchesSubject && matchesTags && !note.isArchived;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'updated':
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  const handleCreateNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes([newNote, ...notes]);
    setIsCreating(false);
  };

  const handleEditNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingNote) return;
    
    const updatedNote: Note = {
      ...editingNote,
      ...noteData,
      updatedAt: new Date()
    };
    
    setNotes(notes.map(note => note.id === editingNote.id ? updatedNote : note));
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleToggleStar = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isStarred: !note.isStarred } : note
    ));
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getPreviewText = (content: string, maxLength: number = 150) => {
    const plainText = content
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/>\s+/g, '')
      .replace(/[-*+]\s+/g, '')
      .replace(/\d+\.\s+/g, '');
    
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  if (isCreating || editingNote) {
    return (
      <NoteEditor
        note={editingNote || undefined}
        onSave={editingNote ? handleEditNote : handleCreateNote}
        onCancel={() => {
          setIsCreating(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-primary" />
            My Notes
          </h1>
          <p className="text-slate-600 mt-1">
            {filteredNotes.length} notes • {subjects.length - 1} subjects
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search notes, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={(value: 'updated' | 'created' | 'title') => setSortBy(value)}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Recent</SelectItem>
                <SelectItem value="created">Newest</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Filter by tags:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => handleTagSelect(tag)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No notes found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || selectedTags.length > 0 
                ? "Try adjusting your search or filters"
                : "Create your first note to get started"
              }
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card 
              key={note.id} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setEditingNote(note)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(note.id);
                    }}
                  >
                    <Star className={cn(
                      "w-4 h-4",
                      note.isStarred ? "fill-warning text-warning" : "text-slate-400"
                    )} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 line-clamp-3">
                  {getPreviewText(note.content)}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {note.subject}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {note.updatedAt.toLocaleDateString()}
                  </div>
                </div>

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{note.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNote(note);
                      }}
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add share functionality
                      }}
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
