import { useEffect, useState } from 'react'
import { useCollectionAttributes } from '../../hooks/useCollectionAttributes'
import { Row } from '../Flex'
import { NumericInput } from '../layout/Input'
import { FormEvent, FocusEventHandler } from 'react'
import { isNumber } from '../../utils/numbers'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../../utils/scrollToTop'
import { useIsMobile } from 'nft/hooks'

export const PriceRange = () => {
  const [placeholderText, setPlaceholderText] = useState('')
  const setMinPrice = useCollectionAttributes((state) => state.setMinPrice)
  const setMaxPrice = useCollectionAttributes((state) => state.setMaxPrice)
  const minPrice = useCollectionAttributes((state) => state.minPrice)
  const maxPrice = useCollectionAttributes((state) => state.maxPrice)
  const isMobile = useIsMobile()

  const location = useLocation()

  useEffect(() => {
    setMinPrice('')
    setMaxPrice('')
  }, [location.pathname])

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setPlaceholderText(e.currentTarget.placeholder)
    e.currentTarget.placeholder = ''
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.placeholder = placeholderText
    setPlaceholderText('')
  }

  return (
    <Row gap="12" marginTop="12" color="blackBlue">
      <Row position="relative" style={{ flex: 1 }}>
        <NumericInput
          style={{
            width: isMobile ? '100%' : '142px',
            border: '2px solid rgba(153, 161, 189, 0.24)',
          }}
          borderRadius="12"
          padding="12"
          fontSize="14"
          color={{ placeholder: 'darkGray', default: 'blackBlue' }}
          backgroundColor="transparent"
          placeholder="Min"
          defaultValue={minPrice}
          onChange={(v: FormEvent<HTMLInputElement>) => {
            scrollToTop()
            setMinPrice(isNumber(v.currentTarget.value) ? parseFloat(v.currentTarget.value) : '')
          }}
          onFocus={handleFocus}
          value={minPrice}
          onBlur={handleBlur}
        />
      </Row>
      <Row position="relative" style={{ flex: 1 }}>
        <NumericInput
          style={{
            width: isMobile ? '100%' : '142px',
            border: '2px solid rgba(153, 161, 189, 0.24)',
          }}
          borderColor={{ default: 'medGray', focus: 'darkGray' }}
          borderRadius="12"
          padding="12"
          fontSize="14"
          color={{ placeholder: 'darkGray', default: 'blackBlue' }}
          backgroundColor="transparent"
          placeholder="Max"
          defaultValue={maxPrice}
          value={maxPrice}
          onChange={(v: FormEvent<HTMLInputElement>) => {
            scrollToTop()
            setMaxPrice(isNumber(v.currentTarget.value) ? parseFloat(v.currentTarget.value) : '')
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Row>
    </Row>
  )
}
