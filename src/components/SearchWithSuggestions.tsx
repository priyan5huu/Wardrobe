import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { mockProducts } from '../data/mockData';

interface SearchWithSuggestionsProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchWithSuggestions({ 
  onSearch, 
  placeholder = "Search items...",
  className = ""
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState(['Evening gown', 'Leather jacket', 'Silk saree']);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = mockProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
        .map(product => product.name);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </form>

      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">Suggestions</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="p-4 text-center text-gray-500">
              No suggestions found
            </div>
          ) : null}

          {query.length <= 1 && recentSearches.length > 0 && (
            <div className="p-2 border-t">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center"
                >
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}

          <div className="p-2 border-t">
            <div className="text-xs font-medium text-gray-500 px-3 py-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </div>
            {['Designer wear', 'Wedding collection', 'Casual outfits'].map((trend, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(trend)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center"
              >
                <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
                <span>{trend}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}