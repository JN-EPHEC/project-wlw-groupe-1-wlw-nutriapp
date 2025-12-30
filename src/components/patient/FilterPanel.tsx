import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  allergies: string[];
  healthConditions: string[];
  prepTimeRange: [number, number];
}

const allergyOptions = [
  'Gluten',
  'Lactose',
  'Peanuts',
  'Eggs',
  'Shellfish',
  'Soy',
  'Tree Nuts',
  'Fish'
];

const healthConditionOptions = [
  { id: 'diabetes', label: 'Type 2 Diabetes' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'cholesterol', label: 'High Cholesterol' },
  { id: 'obesity', label: 'Obesity / Overweight' }
];

export default function FilterPanel({ isOpen, onClose, onApplyFilters }: FilterPanelProps) {
  const [allergiesExpanded, setAllergiesExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [prepTimeExpanded, setPrepTimeExpanded] = useState(true);
  
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
  const [prepTimeRange, setPrepTimeRange] = useState<[number, number]>([15, 50]);

  const [showMoreAllergies, setShowMoreAllergies] = useState(false);

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleHealthCondition = (condition: string) => {
    setSelectedHealthConditions(prev =>
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      allergies: selectedAllergies,
      healthConditions: selectedHealthConditions,
      prepTimeRange
    });
    onClose();
  };

  const handleClearAll = () => {
    setSelectedAllergies([]);
    setSelectedHealthConditions([]);
    setPrepTimeRange([15, 50]);
  };

  if (!isOpen) return null;

  const visibleAllergies = showMoreAllergies ? allergyOptions : allergyOptions.slice(0, 4);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-h2 text-[#1A1A1A]">Filtres</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-[#6C6C6C]" strokeWidth={2} />
            </button>
          </div>

          {/* Allergies / Intolerances Section */}
          <div className="space-y-3">
            <button
              onClick={() => setAllergiesExpanded(!allergiesExpanded)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-body-2 uppercase tracking-wider text-[#6C6C6C] font-semibold">
                Allergies / Intolerances
              </h3>
              {allergiesExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              )}
            </button>

            {allergiesExpanded && (
              <div className="space-y-3 pl-1">
                {visibleAllergies.map((allergy) => (
                  <div key={allergy} className="flex items-center gap-3">
                    <Checkbox
                      id={`allergy-${allergy}`}
                      checked={selectedAllergies.includes(allergy)}
                      onCheckedChange={() => toggleAllergy(allergy)}
                    />
                    <Label 
                      htmlFor={`allergy-${allergy}`}
                      className="text-[#1A1A1A] text-body-1 cursor-pointer flex-1"
                    >
                      {allergy}
                    </Label>
                  </div>
                ))}
                
                {allergyOptions.length > 4 && (
                  <button
                    onClick={() => setShowMoreAllergies(!showMoreAllergies)}
                    className="text-body-2 text-[#1DBF73] hover:underline font-medium"
                  >
                    {showMoreAllergies ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#DADADA]" />

          {/* Health Filters Section */}
          <div className="space-y-3">
            <button
              onClick={() => setHealthExpanded(!healthExpanded)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-body-2 uppercase tracking-wider text-[#6C6C6C] font-semibold">
                Health Filters
              </h3>
              {healthExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              )}
            </button>

            {healthExpanded && (
              <div className="space-y-3 pl-1">
                {healthConditionOptions.map((condition) => (
                  <div key={condition.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`health-${condition.id}`}
                      checked={selectedHealthConditions.includes(condition.id)}
                      onCheckedChange={() => toggleHealthCondition(condition.id)}
                    />
                    <Label 
                      htmlFor={`health-${condition.id}`}
                      className="text-[#1A1A1A] text-body-1 cursor-pointer flex-1"
                    >
                      {condition.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#DADADA]" />

          {/* Preparation Time Section */}
          <div className="space-y-4">
            <button
              onClick={() => setPrepTimeExpanded(!prepTimeExpanded)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-body-2 uppercase tracking-wider text-[#6C6C6C] font-semibold">
                Preparation Time
              </h3>
              {prepTimeExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6C6C6C]" strokeWidth={2} />
              )}
            </button>

            {prepTimeExpanded && (
              <div className="space-y-4 pl-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 p-3 rounded-lg border border-[#DADADA] text-center">
                    <span className="text-[#1A1A1A] text-body-1 font-medium">{prepTimeRange[0]}min</span>
                  </div>
                  <div className="w-4 h-px bg-[#DADADA]" />
                  <div className="flex-1 p-3 rounded-lg border border-[#DADADA] text-center">
                    <span className="text-[#1A1A1A] text-body-1 font-medium">{prepTimeRange[1]}min</span>
                  </div>
                </div>
                
                <Slider
                  value={prepTimeRange}
                  onValueChange={(value) => setPrepTimeRange(value as [number, number])}
                  min={5}
                  max={120}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleApplyFilters}
              className="w-full h-12 rounded-lg bg-[#1A1A1A] hover:bg-[#000000] text-white shadow-button"
            >
              View recipes
            </Button>
            <button
              onClick={handleClearAll}
              className="w-full text-body-2 text-[#6C6C6C] hover:text-[#1A1A1A] font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </>
  );
}