import React, { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

interface DecimalInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  placeholder: string;
  max?: number;
  decimals?: number;
}

interface SlippageSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const numberOnlyRegExp = new RegExp(/[0-9.]/g);
const maxSlippagePercentage = 50;

const DecimalInput: React.FC<DecimalInputProps> = ({ value, onChange, onBlur, onFocus, placeholder, max = maxSlippagePercentage, decimals = 2 }) => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.match(numberOnlyRegExp)?.join('') || '';
    onChange(sanitizedValue);
  };

  return (
    <input
      type="text"
      className="bg-background border border-input rounded-md h-9 w-20 py-2 px-3 text-right text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      aria-label="Custom slippage input"
      maxLength={max.toString().length + (decimals > 0 ? decimals + 1 : 0)}
    />
  );
};

const SlippageSettingModal: React.FC<SlippageSettingModalProps> = ({ isOpen, onClose }) => {
  const [slippage, setSlippage] = useState(0.01);
  const [currentSlippage, setCurrentSlippage] = useState(String(slippage * 100));
  const [isFirstFocused, setIsFirstFocused] = useState(false);

  const handleChange = (val: string) => {
    setIsFirstFocused(false);
    setCurrentSlippage(val);
  };

  const handleUpdateSlippage = (val: string) => {
    const numericValue = parseFloat(val);
    if (!isNaN(numericValue)) {
      setSlippage(numericValue / 100);
    }
  };

  const handleBlur = () => {
    setIsFirstFocused(false);
    if (!currentSlippage) handleChange('0');
  };

  const handleFocus = () => {
    setIsFirstFocused(true);
  };

  const handleSaveFee = () => {
    handleUpdateSlippage(currentSlippage || '0');
    onClose();
  };

  useEffect(() => {
    setCurrentSlippage(String(slippage * 100));
  }, [slippage, isOpen]);

  const slippageDecimal = parseFloat(currentSlippage || '0');
  const isForerun = slippageDecimal > 3;
  const isFailrun = slippageDecimal < 0.5;
  const isWarn = isForerun || isFailrun;
  const warnText = isForerun
    ? "Your transaction may be frontrun and result in an unfavorable trade"
    : isFailrun
    ? "Your transaction may fail"
    : '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm p-4 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg border border-border shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Swap Slippage Tolerance
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close slippage setting modal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-2">
              {[0.1, 0.5, 1].map((v) => (
                <button
                  key={v}
                  className={`px-3 w-16 py-1 rounded-md text-sm transition-colors ${
                    Number(currentSlippage) === v
                      ? 'bg-black hover:bg-black/90 text-white'
                      : 'bg-white text-black border'
                  }`}
                  onClick={() => handleChange(String(v))}
                  aria-pressed={Number(currentSlippage) === v}
                >
                  {v}%
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <span className="text-muted-foreground text-sm">Custom</span>
              <DecimalInput
                value={isFirstFocused ? '' : currentSlippage}
                placeholder="0.5"
                max={50}
                decimals={2}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <span className="text-muted-foreground text-sm">%</span>
            </div>
          </div>
          {isWarn && (
            <div
              className="bg-yellow-400/15 text-yellow-500 border-yellow-400 border-2 px-4 py-3 rounded-md text-sm flex items-center space-x-2"
              role="alert"
            >
              <span>⚠️</span>
              <span>{warnText}</span>
            </div>
          )}
          <button
            className="w-full bg-black dark:bg-white dark:text-black hover:bg-black/90 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={slippageDecimal < 0 || slippageDecimal > maxSlippagePercentage}
            onClick={handleSaveFee}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlippageSettingModal;